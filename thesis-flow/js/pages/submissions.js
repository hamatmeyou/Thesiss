// ── SUBMISSIONS PAGE ─────────────────────────────────────────

function renderSubmissions(user) {
  const content = document.getElementById('page-content');

  let subs = [];
  if (user.role === 'student') {
    const group = MockDB.getGroupByUserId(user.id);
    subs = group ? MockDB.getSubmissionsByGroup(group.id) : [];
  } else if (user.role === 'adviser') {
    subs = MockDB.getSubmissionsForAdviser(user.id);
  } else {
    subs = MockDB.getAllSubmissions();
  }

  const canSubmit = user.role === 'student';

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

  return `<div style="display:flex;flex-direction:column;gap:20px;">
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
  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Document Title</label><input type="text" id="sub-title" value="${title}" readonly style="background:var(--bg-2);" /></div>
      <div class="form-group"><label>Type</label><input type="text" id="sub-type" value="${type}" readonly style="background:var(--bg-2);" /></div>
      <div class="form-group"><label>Description of Changes</label><textarea id="sub-desc" placeholder="What did you update in this version?"></textarea></div>
      <div class="form-group"><label>New File Name</label><input type="text" id="sub-file" placeholder="e.g., ${title}_v2.pdf" /></div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="submitNewVersion('${threadId}')">Submit Version</button>
      </div>
    </div>`, 'Submit New Version');
}

function submitNewVersion(threadId) {
  const user  = getCurrentUser();
  const group = MockDB.getGroupByUserId(user.id);
  const title = document.getElementById('sub-title').value;
  const type  = document.getElementById('sub-type').value;
  const desc  = document.getElementById('sub-desc').value.trim();
  const file  = document.getElementById('sub-file').value.trim();

  if (!desc) { showToast('Please describe the changes.', 'warning'); return; }

  MockDB.addSubmission({
    id: MockDB.genId('s'),
    threadId,
    groupId: group.id,
    title, description: desc, type,
    status: 'Pending',
    fileUrl: '#',
    fileName: file || title + '_revised.pdf',
    fileSize: (Math.random()*4+0.5).toFixed(1) + ' MB',
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
  if (!group) { showToast('You are not in a group yet.', 'warning'); return; }

  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Document Title</label><input type="text" id="sub-title" placeholder="e.g., Chapter 1 - Introduction" /></div>
      <div class="form-group"><label>Type</label>
        <select id="sub-type">
          ${['Chapter','Proposal','Supporting Document','Final Manuscript'].map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Description</label><textarea id="sub-desc" placeholder="Briefly describe what this submission contains..."></textarea></div>
      <div class="form-group"><label>File Name (simulated)</label><input type="text" id="sub-file" placeholder="e.g., Chapter1_Introduction.pdf" /></div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="submitDocument('${group.id}')">Submit</button>
      </div>
    </div>`, 'New Submission');
}

function submitDocument(groupId) {
  const title = document.getElementById('sub-title').value.trim();
  const type  = document.getElementById('sub-type').value;
  const desc  = document.getElementById('sub-desc').value.trim();
  const file  = document.getElementById('sub-file').value.trim();

  if (!title || !desc) { showToast('Please fill in all fields.', 'warning'); return; }

  MockDB.addSubmission({
    id: MockDB.genId('s'),
    groupId,
    title, description: desc, type,
    status: 'Pending',
    fileUrl: '#',
    fileName: file || title + '.pdf',
    fileSize: (Math.random()*4+0.5).toFixed(1) + ' MB',
    submittedBy: getCurrentUser().id,
    submittedAt: new Date().toISOString().split('T')[0],
    reviewedAt: null,
    reviewedBy: null
  });

  closeModal();
  showToast('Document submitted for review!', 'success');
  renderSubmissions(getCurrentUser());
}
