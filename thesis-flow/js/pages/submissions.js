// ── SUBMISSIONS PAGE ─────────────────────────────────────────

function renderSubmissions(user) {
  const content = document.getElementById('page-content');

  let subs = [];
  if (user.role === 'student') {
    const group = MockDB.getGroupByUserId(user.id);
    subs = group ? MockDB.getSubmissionsByGroup(group.id) : [];
  } else if (user.role === 'adviser') {
    subs = MockDB.getSubmissionsForAdviser(user.id);
  } else if (user.role === 'panelist') {
    const assignedGroupIds = Array.isArray(user.assignedGroups) ? user.assignedGroups : [];
    subs = MockDB.getAllSubmissions().filter(s => assignedGroupIds.includes(s.groupId));
  } else {
    subs = MockDB.getAllSubmissions();
  }

  const canSubmit = user.role === 'student';
  const group = user.role === 'student' ? MockDB.getGroupByUserId(user.id) : null;
  const submissionWindow = group ? getSubmissionWindowStatus(group) : { allowed: true, reason: '' };
  const canManageOverride = user.role === 'adviser' || user.role === 'admin';
  const manageableGroups = canManageOverride
    ? (user.role === 'admin' ? MockDB.getAllGroups() : MockDB.getGroupsByAdviserId(user.id))
    : [];

  const filterHtml = `
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
      ${['All','Pending','Reviewed','Approved','Rejected'].map(f => `
        <button class="btn-sm ${f==='All'?'btn-primary':'btn-outline'}" id="filter-${f}" onclick="filterSubmissions('${f}')">${f}</button>`).join('')}
    </div>`;

  content.innerHTML = `
    <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <h2>📄 Submissions</h2>
        <p>${canSubmit ? 'Submit and track your thesis documents.' : 'Review and manage thesis submissions.'}</p>
      </div>
      ${canSubmit ? `<button class="btn-primary btn-sm" onclick="openSubmitModal()">＋ New Submission</button>` : ''}
    </div>
    ${canSubmit && group ? renderSubmissionWindowNotice(submissionWindow, group) : ''}
    ${canManageOverride ? renderOverrideManager(manageableGroups) : ''}
    ${filterHtml}
    <div id="subs-list">
      ${renderSubsList(subs, user)}
    </div>`;

  // Store for filtering
  window._currentSubs = subs;
  window._currentUser = user;
}

function filterSubmissions(status) {
  document.querySelectorAll('[id^="filter-"]').forEach(b => {
    b.classList.remove('btn-primary');
    b.classList.add('btn-outline');
  });
  document.getElementById('filter-' + status).classList.add('btn-primary');
  document.getElementById('filter-' + status).classList.remove('btn-outline');

  const filtered = status === 'All'
    ? window._currentSubs
    : window._currentSubs.filter(s => s.status === status);
  document.getElementById('subs-list').innerHTML = renderSubsList(filtered, window._currentUser);
}

function renderSubsList(subs, user) {
  if (subs.length === 0) return `<div class="empty-state"><div class="empty-icon">📭</div><h3>No Submissions Found</h3><p>Nothing here yet.</p></div>`;

  // Group by threadId
  const threads = {};
  subs.forEach(s => {
    if (!threads[s.threadId]) threads[s.threadId] = [];
    threads[s.threadId].push(s);
  });

  // Sort versions within each thread (descending)
  Object.keys(threads).forEach(tid => {
    threads[tid].sort((a, b) => b.version - a.version);
  });

  // Sort threads by the latest submission date (descending)
  const sortedThreadIds = Object.keys(threads).sort((a, b) => {
    return new Date(threads[b][0].submittedAt) - new Date(threads[a][0].submittedAt);
  });

  let actionCard = '';
  if (user.role === 'student') {
    const group = MockDB.getGroupByUserId(user.id);
    if (group) {
      const currentStage = group.progress.stages[group.progress.currentStage];
      
      // 1. Check if ANY submission exists for current stage
      const hasSubForStage = subs.some(s => 
        s.title.toLowerCase().includes(currentStage.toLowerCase()) || 
        (s.type === 'Chapter' && currentStage.toLowerCase().includes('chapter')) ||
        (s.type === 'Proposal' && currentStage.toLowerCase().includes('proposal'))
      );

      // 2. Check if latest of ANY thread is Rejected
      const rejectedThread = Object.keys(threads).find(tid => threads[tid][0].status === 'Rejected');

      if (!hasSubForStage) {
        actionCard = `
          <div class="card" style="background:rgba(251,191,36,0.08); border-color:rgba(251,191,36,0.3); padding:16px; margin-bottom:20px;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="font-size:24px;">🔔</div>
                <div>
                  <div style="font-weight:700; color:var(--warning); font-size:0.95rem;">Action Required: Submit ${currentStage}</div>
                  <div style="font-size:0.82rem; color:var(--text-2); margin-top:2px;">Your group is currently at this stage. Please submit your document for review.</div>
                </div>
              </div>
              <button class="btn-sm btn-primary" onclick="openSubmitModal()">Submit Now</button>
            </div>
          </div>`;
      } else if (rejectedThread) {
        const t = threads[rejectedThread][0];
        actionCard = `
          <div class="card" style="background:rgba(248,113,113,0.08); border-color:rgba(248,113,113,0.3); padding:16px; margin-bottom:20px;">
            <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="font-size:24px;">❌</div>
                <div>
                  <div style="font-weight:700; color:var(--danger); font-size:0.95rem;">Resubmission Required: ${t.title}</div>
                  <div style="font-size:0.82rem; color:var(--text-2); margin-top:2px;">Your previous version was rejected. Please review feedback and resubmit.</div>
                </div>
              </div>
              <button class="btn-sm btn-primary" onclick="openResubmitModal('${t.threadId}', '${t.title}', '${t.type}')">Resubmit Version</button>
            </div>
          </div>`;
      }
    }
  }

  return `<div style="display:flex;flex-direction:column;gap:20px;">
    ${actionCard}
    ${sortedThreadIds.map(tid => {
      const versions = threads[tid];
      const latest = versions[0];
      const history = versions.slice(1);
      const group  = MockDB.getGroupById(latest.groupId);
      const by     = MockDB.getUserById(latest.submittedBy);
      const canReview = (user.role === 'adviser' || user.role === 'admin') && latest.status === 'Pending';
      const canResubmit = user.role === 'student' && latest.status !== 'Approved';

      return `
      <div class="card" style="padding:0; overflow:hidden;">
        <!-- Latest Version -->
        <div style="padding:20px;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
                <span style="font-weight:700;font-size:1.1rem;">${latest.title}</span>
                <span class="badge badge-primary" style="background:var(--primary-light);color:var(--primary);font-weight:700;">v${latest.version}</span>
                ${statusBadge(latest.status)}
                <span class="badge badge-muted">${latest.type}</span>
              </div>
              <div style="font-size:0.85rem;color:var(--text-2);margin-bottom:12px;">${latest.description}</div>
              <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.8rem;color:var(--text-3);">
                <span>👤 ${by ? by.name : '—'}</span>
                ${group ? `<span>👥 ${group.title.slice(0, 35)}…</span>` : ''}
                <span>📅 ${formatDate(latest.submittedAt)}</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
              <div style="font-size:0.85rem;font-weight:600;color:var(--text-1);">📎 ${latest.fileName}</div>
              <div style="font-size:0.75rem;color:var(--text-3);">${latest.fileSize}</div>
              
              <div style="display:flex;gap:6px;margin-top:10px;">
                ${canReview ? `
                  <button class="btn-sm btn-success-sm" onclick="reviewSubmission('${latest.id}','Approved')">Approve</button>
                  <button class="btn-sm btn-danger-sm"  onclick="reviewSubmission('${latest.id}','Rejected')">Reject</button>
                  <button class="btn-sm btn-outline"     onclick="openFeedbackFromSub('${latest.id}','${latest.groupId}')">Feedback</button>
                ` : ''}
                ${canResubmit ? `
                  <button class="btn-sm btn-primary" onclick="openResubmitModal('${latest.threadId}', '${latest.title}', '${latest.type}')">Submit New Version</button>
                ` : ''}
                ${history.length > 0 ? `
                  <button class="btn-sm btn-outline" onclick="toggleHistory('${tid}')" id="btn-history-${tid}">
                    ${history.length} Previous ${history.length === 1 ? 'Version' : 'Versions'}
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- History Section (Hidden by default) -->
        <div id="history-${tid}" class="history-container" style="display:none;">
          <h4 style="font-size:0.8rem; text-transform:uppercase; color:var(--text-3); margin-bottom:12px; letter-spacing:0.05em;">Revision History</h4>
          <div style="display:flex; flex-direction:column;">
            ${history.map(v => `
              <div class="history-item">
                <div class="history-label">
                  <span class="history-v">v${v.version}</span>
                  <span>${statusBadge(v.status)}</span>
                  <span style="color:var(--text-2); font-size:0.8rem;">${formatDate(v.submittedAt)}</span>
                </div>
                <div style="color:var(--text-3); font-size:0.8rem;">
                  📎 ${v.fileName} (${v.fileSize})
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;}).join('')}
  </div>`;
}

function toggleHistory(threadId) {
  const el = document.getElementById(`history-${threadId}`);
  const btn = document.getElementById(`btn-history-${threadId}`);
  if (el.style.display === 'none') {
    el.style.display = 'block';
    btn.textContent = 'Hide History';
  } else {
    el.style.display = 'none';
    const threadCount = el.querySelectorAll('.border-bottom-1').length; // approximation
    // Better: just re-render or hardcode if we know the length, but let's just use simple text
    btn.textContent = 'View History'; 
    renderSubmissions(window._currentUser); // Refresh to get correct text
  }
}

function openResubmitModal(threadId, title, type) {
  const user = getCurrentUser();
  const group = MockDB.getGroupByUserId(user.id);
  const submissionWindow = group ? getSubmissionWindowStatus(group) : { allowed: true, reason: '' };
  if (!submissionWindow.allowed) {
    showToast(submissionWindow.reason || 'Submission period is closed for your current stage.', 'warning');
    return;
  }

  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Document Title</label><input type="text" id="sub-title" value="${title}" readonly style="background:var(--bg-2);" /></div>
      <div class="form-group"><label>Type</label><input type="text" id="sub-type" value="${type}" readonly style="background:var(--bg-2);" /></div>
      <div class="form-group"><label>Description of Changes</label><textarea id="sub-desc" placeholder="What did you update in this version?"></textarea></div>
      <div class="form-group">
        <label>Upload File</label>
        <input type="file" id="sub-file-upload" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.txt,.png,.jpg,.jpeg" onchange="handleSubmissionFileUpload(event)" />
        <div id="sub-file-meta" style="font-size:0.8rem;color:var(--text-3);margin-top:6px;">No file selected</div>
      </div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="submitNewVersion('${threadId}')">Submit Version</button>
      </div>
    </div>`, 'Submit New Version');
}

function submitNewVersion(threadId) {
  const user  = getCurrentUser();
  const group = MockDB.getGroupByUserId(user.id);
  const submissionWindow = group ? getSubmissionWindowStatus(group) : { allowed: true, reason: '' };
  const title = document.getElementById('sub-title').value;
  const type  = document.getElementById('sub-type').value;
  const desc  = document.getElementById('sub-desc').value.trim();
  const fileInput = document.getElementById('sub-file-upload');
  const selectedFile = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

  if (!desc) { showToast('Please describe the changes.', 'warning'); return; }
  if (!submissionWindow.allowed) { showToast(submissionWindow.reason, 'warning'); return; }
  if (!selectedFile) { showToast('Please upload a file first.', 'warning'); return; }

  MockDB.addSubmission({
    id: MockDB.genId('s'),
    threadId,
    groupId: group.id,
    title, description: desc, type,
    status: 'Pending',
    fileUrl: '#',
    fileName: selectedFile.name,
    fileSize: formatUploadedFileSize(selectedFile.size),
    submittedBy: user.id,
    submittedAt: new Date().toISOString().split('T')[0],
    reviewedAt: null,
    reviewedBy: null
  });

  closeModal();
  showToast('New version submitted!', 'success');
  renderSubmissions(user);
}

function reviewSubmission(subId, status) {
  MockDB.updateSubmissionStatus(subId, status);
  showToast(`Submission marked as ${status}`, status === 'Approved' ? 'success' : 'error');
  renderSubmissions(getCurrentUser());
}

function openFeedbackFromSub(subId, groupId) {
  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Feedback Comment</label><textarea id="fb-content" placeholder="Write your feedback..." style="min-height:120px;"></textarea></div>
      <div class="form-group"><label>Rating (optional)</label>
        <select id="fb-rating">
          <option value="">No rating</option>
          ${[1,2,3,4,5].map(n=>`<option value="${n}">${'⭐'.repeat(n)} (${n})</option>`).join('')}
        </select>
      </div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="submitFeedback('${subId}','${groupId}')">Post Feedback</button>
      </div>
    </div>`, 'Leave Feedback');
}

function submitFeedback(subId, groupId) {
  const content = document.getElementById('fb-content').value.trim();
  const rating  = document.getElementById('fb-rating').value;
  if (!content) { showToast('Please write feedback first.', 'warning'); return; }

  MockDB.addFeedback({
    id: MockDB.genId('fb'),
    groupId,
    submissionId: subId,
    authorId: getCurrentUser().id,
    content,
    rating: rating ? parseInt(rating) : null,
    createdAt: new Date().toISOString()
  });

  closeModal();
  showToast('Feedback posted!', 'success');
}

function openSubmitModal() {
  const user  = getCurrentUser();
  const group = MockDB.getGroupByUserId(user.id);
  const submissionWindow = group ? getSubmissionWindowStatus(group) : { allowed: true, reason: '' };
  if (!group) { showToast('You are not in a group yet.', 'warning'); return; }
  if (!submissionWindow.allowed) { showToast(submissionWindow.reason, 'warning'); return; }

  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Document Title</label><input type="text" id="sub-title" placeholder="e.g., Chapter 1 - Introduction" /></div>
      <div class="form-group"><label>Type</label>
        <select id="sub-type">
          ${['Chapter','Proposal','Supporting Document','Final Manuscript'].map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Description</label><textarea id="sub-desc" placeholder="Briefly describe what this submission contains..."></textarea></div>
      <div class="form-group">
        <label>Upload File</label>
        <input type="file" id="sub-file-upload" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.txt,.png,.jpg,.jpeg" onchange="handleSubmissionFileUpload(event)" />
        <div id="sub-file-meta" style="font-size:0.8rem;color:var(--text-3);margin-top:6px;">No file selected</div>
      </div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="submitDocument('${group.id}')">Submit</button>
      </div>
    </div>`, 'New Submission');
}

function submitDocument(groupId) {
  const user = getCurrentUser();
  const group = MockDB.getGroupById(groupId);
  const submissionWindow = group ? getSubmissionWindowStatus(group) : { allowed: true, reason: '' };
  const title = document.getElementById('sub-title').value.trim();
  const type  = document.getElementById('sub-type').value;
  const desc  = document.getElementById('sub-desc').value.trim();
  const fileInput = document.getElementById('sub-file-upload');
  const selectedFile = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

  if (!title || !desc) { showToast('Please fill in all fields.', 'warning'); return; }
  if (!submissionWindow.allowed) { showToast(submissionWindow.reason, 'warning'); return; }
  if (!selectedFile) { showToast('Please upload a file first.', 'warning'); return; }

  MockDB.addSubmission({
    id: MockDB.genId('s'),
    groupId,
    title, description: desc, type,
    status: 'Pending',
    fileUrl: '#',
    fileName: selectedFile.name,
    fileSize: formatUploadedFileSize(selectedFile.size),
    submittedBy: user.id,
    submittedAt: new Date().toISOString().split('T')[0],
    reviewedAt: null,
    reviewedBy: null
  });

  closeModal();
  showToast('Document submitted for review!', 'success');
  renderSubmissions(user);
}

function handleSubmissionFileUpload(event) {
  const file = event && event.target && event.target.files && event.target.files[0]
    ? event.target.files[0]
    : null;
  const metaEl = document.getElementById('sub-file-meta');
  if (!metaEl) return;
  if (!file) {
    metaEl.textContent = 'No file selected';
    return;
  }

  metaEl.textContent = `Selected: ${file.name} (${formatUploadedFileSize(file.size)})`;
}

function formatUploadedFileSize(sizeInBytes) {
  if (!sizeInBytes || sizeInBytes < 0) return '0 KB';
  const sizeInMB = sizeInBytes / (1024 * 1024);
  if (sizeInMB >= 1) return `${sizeInMB.toFixed(2)} MB`;
  const sizeInKB = sizeInBytes / 1024;
  return `${Math.max(sizeInKB, 0.1).toFixed(1)} KB`;
}

function renderOverrideManager(groups) {
  if (!groups.length) return '';
  return `
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>
          <div style="font-family:'Outfit',sans-serif;font-size:1rem;font-weight:700;">⏰ Late Submission Override</div>
          <div style="font-size:0.82rem;color:var(--text-2);margin-top:4px;">Allow late submissions for selected groups with a required reason.</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-top:14px;">
        ${groups.map(g => {
          const override = g.submissionOverride || { enabled: false, reason: '' };
          return `
            <div style="background:var(--bg-2);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:12px;">
              <div style="font-size:0.82rem;font-weight:600;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.title}</div>
              <div style="font-size:0.76rem;color:${override.enabled ? 'var(--warning)' : 'var(--text-3)'};margin-bottom:8px;">
                ${override.enabled ? `Override ON${override.reason ? `: ${override.reason}` : ''}` : 'Override OFF'}
              </div>
              <button class="btn-sm ${override.enabled ? 'btn-danger-sm' : 'btn-outline'}" onclick="openSubmissionOverrideModal('${g.id}')">
                ${override.enabled ? 'Disable Override' : 'Enable Override'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function openSubmissionOverrideModal(groupId) {
  const user = getCurrentUser();
  const group = MockDB.getGroupById(groupId);
  if (!group || !user) return;
  if (user.role === 'adviser' && group.adviserId !== user.id) {
    showToast('You can only manage override for your assigned groups.', 'warning');
    return;
  }

  const current = group.submissionOverride || { enabled: false, reason: '' };
  const actionLabel = current.enabled ? 'Disable' : 'Enable';
  openModal(`
    <div class="modal-form">
      <div style="font-size:0.85rem;color:var(--text-2);">${group.title}</div>
      <div class="form-group">
        <label>Reason ${current.enabled ? '(optional when disabling)' : '(required)'}</label>
        <textarea id="override-reason" placeholder="e.g., Approved extension due to approved consultation request.">${current.reason || ''}</textarea>
      </div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm ${current.enabled ? 'btn-danger-sm' : 'btn-primary'}" onclick="saveSubmissionOverride('${group.id}', ${current.enabled ? 'false' : 'true'})">${actionLabel} Override</button>
      </div>
    </div>`, `${actionLabel} Late Submission Override`);
}

function saveSubmissionOverride(groupId, enableOverride) {
  const user = getCurrentUser();
  const group = MockDB.getGroupById(groupId);
  if (!group || !user) return;
  if (user.role === 'adviser' && group.adviserId !== user.id) {
    showToast('You can only manage override for your assigned groups.', 'warning');
    return;
  }

  const reason = (document.getElementById('override-reason')?.value || '').trim();
  if (enableOverride && !reason) {
    showToast('Please provide a reason before enabling override.', 'warning');
    return;
  }

  if (typeof MockDB.setGroupSubmissionOverride !== 'function') {
    showToast('Override feature is unavailable.', 'error');
    return;
  }

  MockDB.setGroupSubmissionOverride(groupId, {
    enabled: enableOverride,
    reason: enableOverride ? reason : '',
    updatedBy: user.id,
    updatedAt: new Date().toISOString()
  });

  if (enableOverride) {
    group.memberIds.forEach(studentId => {
      MockDB.addNotification({
        id: MockDB.genId('n'),
        userId: studentId,
        title: 'Late Submission Override Enabled',
        message: `${user.name} approved a late submission override for your group.`,
        type: 'submission',
        read: false,
        createdAt: new Date().toISOString(),
        link: 'submissions'
      });
    });

    if (user.role === 'adviser') {
      const admins = typeof MockDB.getUsersByRole === 'function' ? MockDB.getUsersByRole('admin') : [];
      admins.forEach(admin => {
        MockDB.addNotification({
          id: MockDB.genId('n'),
          userId: admin.id,
          title: 'Adviser Enabled Late Submission',
          message: `${user.name} enabled late submission for group ${group.title.slice(0, 40)}... Reason: ${reason}`,
          type: 'submission',
          read: false,
          createdAt: new Date().toISOString(),
          link: 'submissions'
        });
      });
    }
  }

  closeModal();
  showToast(enableOverride ? 'Late submission override enabled.' : 'Late submission override disabled.', 'success');
  renderSubmissions(user);
}

function getSubmissionWindowStatus(group) {
  if (!group || !group.progress || !Array.isArray(group.progress.stages)) {
    return { allowed: true, reason: '' };
  }

  const override = group.submissionOverride || { enabled: false, reason: '' };
  if (override.enabled) {
    return {
      allowed: true,
      reason: '',
      overridden: true,
      overrideReason: override.reason || 'Late submission approved by adviser/admin.'
    };
  }

  const currentStage = (group.progress.stages[group.progress.currentStage] || '').toLowerCase();
  const timeline = typeof MockDB.getAllTimeline === 'function' ? MockDB.getAllTimeline() : [];
  if (!timeline.length) return { allowed: true, reason: '' };

  const normalize = (value) => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedStage = normalize(currentStage);

  const stageKeywordMap = [
    { match: ['titleproposal', 'proposal'], keywords: ['proposal'] },
    { match: ['chapter1', 'intro', 'introduction'], keywords: ['chapter1'] },
    { match: ['chapter2', 'rrl', 'reviewofrelatedliterature'], keywords: ['chapter2'] },
    { match: ['chapter3', 'methodology'], keywords: ['chapter3'] },
    { match: ['finalmanuscript', 'finaldefense', 'chapter4', 'chapter5', 'final'], keywords: ['final'] }
  ];

  const matchingRule = stageKeywordMap.find(rule => rule.match.some(token => normalizedStage.includes(token)));
  const requiredTimelineItem = matchingRule
    ? timeline.find(t => {
        const normalizedTitle = normalize(t.title);
        return matchingRule.keywords.some(keyword => normalizedTitle.includes(keyword));
      })
    : null;

  if (!requiredTimelineItem || !requiredTimelineItem.date) {
    return { allowed: true, reason: '' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(requiredTimelineItem.date);
  deadline.setHours(23, 59, 59, 999);

  if (today.getTime() <= deadline.getTime()) {
    return { allowed: true, reason: '' };
  }

  return {
    allowed: false,
    reason: `Submission closed: ${requiredTimelineItem.title} deadline (${formatDate(requiredTimelineItem.date)}) has passed.`
  };
}

function renderSubmissionWindowNotice(submissionWindow, group) {
  const stageLabel = group && group.progress && Array.isArray(group.progress.stages)
    ? (group.progress.stages[group.progress.currentStage] || 'Current Stage')
    : 'Current Stage';

  if (submissionWindow.allowed) {
    const extra = submissionWindow.overridden
      ? `<div style="margin-top:5px;color:var(--warning);font-size:0.8rem;">⚠ Late submission override is active: ${submissionWindow.overrideReason}</div>`
      : '';
    return `
      <div class="card" style="padding:12px 14px;margin-bottom:16px;border-color:rgba(111,190,115,0.35);">
        <div style="font-size:0.84rem;color:var(--success);font-weight:600;">✅ Submission allowed for stage: ${stageLabel}</div>
        ${extra}
      </div>
    `;
  }

  return `
    <div class="card" style="padding:12px 14px;margin-bottom:16px;border-color:rgba(248,113,113,0.4);">
      <div style="font-size:0.84rem;color:var(--danger);font-weight:600;">❌ ${submissionWindow.reason}</div>
    </div>
  `;
}
