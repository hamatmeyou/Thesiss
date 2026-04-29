// ── GROUPS PAGE ──────────────────────────────────────────────

function renderGroups(user) {
  const content = document.getElementById('page-content');
  let groups = [];

  if (user.role === 'student') {
    const g = MockDB.getGroupByUserId(user.id);
    groups = g ? [g] : [];
  } else if (user.role === 'adviser') {
    groups = MockDB.getGroupsByAdviserId(user.id);
  } else {
    groups = MockDB.getAllGroups();
  }

  const canCreate = user.role === 'admin';

  content.innerHTML = `
    <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <h2>👥 ${user.role === 'student' ? 'My Group' : user.role === 'adviser' ? 'My Groups' : 'All Groups'}</h2>
        <p>${user.role === 'student' ? 'Your assigned thesis group and details.' : 'Manage and monitor thesis groups.'}</p>
      </div>
      ${canCreate ? `<button class="btn-primary btn-sm" onclick="openCreateGroupModal()">＋ New Group</button>` : ''}
    </div>

    ${groups.length === 0
      ? `<div class="empty-state"><div class="empty-icon">👥</div><h3>No Groups Found</h3><p>${user.role === 'student' ? 'You have not been assigned to a thesis group yet.' : 'No groups assigned to you.'}</p></div>`
      : groups.map(g => renderGroupCard(g, user)).join('')}
  `;
}

function renderGroupCard(g, user) {
  const adviser = g.adviserId ? MockDB.getUserById(g.adviserId) : null;
  const members = g.memberIds.map(id => MockDB.getUserById(id)).filter(Boolean);
  const subs    = MockDB.getSubmissionsByGroup(g.id);

  const canChangeStatus  = user.role === 'admin' || user.role === 'adviser';
  const canAssignAdviser = user.role === 'admin';

  return `
    <div class="card" style="margin-bottom:20px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
            <span style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:700;">${g.title}</span>
            ${statusBadge(g.status)}
          </div>
          <div style="font-size:0.85rem;color:var(--text-2);">${g.description}</div>
          <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">
            ${g.tags.map(t => `<span class="badge badge-primary">${t}</span>`).join('')}
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${canChangeStatus ? `
            <select class="btn-sm btn-outline" style="background:var(--bg-2);color:var(--text);border:1px solid var(--glass-border);padding:6px 10px;border-radius:var(--radius-sm);"
              onchange="advanceGroupStage('${g.id}', this.value)">
              <option value="">Move to Stage...</option>
              ${g.progress.stages.map((s, idx) => `<option value="${idx}" ${g.progress.currentStage===idx?'selected':''}>${s}</option>`).join('')}
            </select>
            <button class="btn-sm btn-outline" onclick="toggleGroupPhase('${g.id}')">${g.phase === 'Capstone 1' ? 'Switch to Capstone 2' : 'Switch to Capstone 1'}</button>
          ` : ''}
          ${canAssignAdviser ? `<button class="btn-sm btn-outline" onclick="openAssignAdviserModal('${g.id}')">Assign Adviser</button>` : ''}
        </div>
      </div>

      <!-- Progress Bar Mini -->
      <div style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-3); margin-bottom:6px;">
          <span>${g.phase} Progress: <strong>${g.progress.stages[g.progress.currentStage]}</strong></span>
          <span>${Math.round((g.progress.currentStage / (g.progress.stages.length - 1)) * 100)}%</span>
        </div>
        <div style="height:4px; background:rgba(255,255,255,0.05); border-radius:2px; overflow:hidden;">
          <div style="width:${(g.progress.currentStage / (g.progress.stages.length - 1)) * 100}%; height:100%; background:var(--primary); transition: width 0.5s ease;"></div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;">
        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;">
          <div style="font-size:0.72rem;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Adviser</div>
          ${adviser
            ? `<div style="display:flex;align-items:center;gap:8px;">
                <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff;">${adviser.avatar}</div>
                <div><div style="font-size:0.85rem;font-weight:600;">${adviser.name}</div><div style="font-size:0.75rem;color:var(--text-3);">${adviser.department || 'Faculty'}</div></div>
              </div>`
            : `<span style="color:var(--text-3);font-size:0.85rem;">Unassigned</span>`}
        </div>

        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;">
          <div style="font-size:0.72rem;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Members (${members.length})</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${members.length ? members.map(m => `
              <div style="display:flex;align-items:center;gap:8px;">
                <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff;">${m.avatar}</div>
                <div style="font-size:0.85rem;">${m.name}</div>
              </div>`).join('')
              : `<span style="color:var(--text-3);font-size:0.85rem;">No members yet</span>`}
          </div>
        </div>

        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;">
          <div style="font-size:0.72rem;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Submissions</div>
          <div style="font-size:1.6rem;font-weight:800;font-family:'Outfit',sans-serif;">${subs.length}</div>
          <div style="font-size:0.78rem;color:var(--text-2);margin-top:2px;">${subs.filter(s=>s.status==='Approved'||s.status==='Reviewed').length} reviewed</div>
        </div>

        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;">
          <div style="font-size:0.72rem;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Program</div>
          <div style="font-size:0.85rem;font-weight:500;">${g.program}</div>
          <div style="font-size:0.75rem;color:var(--text-3);margin-top:3px;">Created ${formatDate(g.createdAt)}</div>
        </div>
      </div>
    </div>`;
}

function advanceGroupStage(groupId, stageIndex) {
  if (stageIndex === "") return;
  MockDB.updateGroupProgress(groupId, parseInt(stageIndex));
  showToast('Group progress updated!', 'success');
  renderGroups(getCurrentUser());
}

function toggleGroupPhase(groupId) {
  const g = MockDB.getGroupById(groupId);
  const newPhase = g.phase === 'Capstone 1' ? 'Capstone 2' : 'Capstone 1';
  confirmAction(`Switch group to ${newPhase}? This will reset their progress stages.`, () => {
    MockDB.updateGroupPhase(groupId, newPhase);
    showToast(`Group moved to ${newPhase}`, 'info');
    renderGroups(getCurrentUser());
  });
}

function updateGroupStatus(groupId, status) {
  if (!status) return;
  MockDB.updateGroupStatus(groupId, status);
  showToast('Group status updated to ' + status, 'success');
  renderGroups(getCurrentUser());
}

function openAssignAdviserModal(groupId) {
  const advisers = MockDB.getUsersByRole('adviser');
  const group    = MockDB.getGroupById(groupId);
  openModal(`
    <div class="modal-title">Assign Adviser</div>
    <p style="color:var(--text-2);font-size:0.88rem;margin-bottom:16px;">Select an adviser for <strong>${group.title.slice(0, 40)}…</strong></p>
    <div class="modal-form">
      <div class="form-group">
        <label>Faculty Adviser</label>
        <select id="sel-adviser">
          <option value="">-- Select --</option>
          ${advisers.map(a => `<option value="${a.id}" ${group.adviserId===a.id?'selected':''}>${a.name} (${a.specialization || 'General'})</option>`).join('')}
        </select>
      </div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="assignAdviser('${groupId}')">Assign</button>
      </div>
    </div>`, 'Assign Adviser');
}

function assignAdviser(groupId) {
  const sel = document.getElementById('sel-adviser');
  const adviserId = sel.value;
  if (!adviserId) { showToast('Please select an adviser', 'warning'); return; }
  const g = MockDB.getGroupById(groupId);
  if (g) g.adviserId = adviserId;
  closeModal();
  showToast('Adviser assigned successfully!', 'success');
  renderGroups(getCurrentUser());
}

function openCreateGroupModal() {
  const students = MockDB.getUsersByRole('student');
  const advisers = MockDB.getUsersByRole('adviser');
  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Group Title</label><input type="text" id="ng-title" placeholder="e.g., SmartLearn: AI Adaptive Learning" /></div>
      <div class="form-group"><label>Description</label><textarea id="ng-desc" placeholder="Brief description of the thesis..."></textarea></div>
      <div class="form-group"><label>Program</label>
        <select id="ng-program">
          <option value="">Select Program</option>
          ${['BS Computer Science','BS Information Technology','BS Computer Engineering','BS Information Systems'].map(p=>`<option>${p}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Assign Adviser</label>
        <select id="ng-adviser">
          <option value="">-- Optional --</option>
          ${advisers.map(a=>`<option value="${a.id}">${a.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Tags (comma separated)</label><input type="text" id="ng-tags" placeholder="AI, Web, Mobile" /></div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="createGroup()">Create Group</button>
      </div>
    </div>`, 'Create New Group');
}

function createGroup() {
  const title   = document.getElementById('ng-title').value.trim();
  const desc    = document.getElementById('ng-desc').value.trim();
  const program = document.getElementById('ng-program').value;
  const adviser = document.getElementById('ng-adviser').value;
  const tags    = document.getElementById('ng-tags').value.split(',').map(t=>t.trim()).filter(Boolean);

  if (!title || !desc || !program) { showToast('Please fill in all required fields.', 'warning'); return; }

  MockDB.addGroup({
    id: MockDB.genId('g'),
    title, description: desc, program,
    status: 'Pending',
    adviserId: adviser || null,
    memberIds: [],
    tags,
    createdAt: new Date().toISOString().split('T')[0]
  });

  closeModal();
  showToast('Group created successfully!', 'success');
  renderGroups(getCurrentUser());
}
