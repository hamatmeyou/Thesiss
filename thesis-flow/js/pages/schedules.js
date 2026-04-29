// ── SCHEDULES PAGE ───────────────────────────────────────────

function renderSchedules(user) {
  const content = document.getElementById('page-content');

  let schedules = [];
  if (user.role === 'student') {
    schedules = MockDB.getSchedulesForUser(user.id);
  } else if (user.role === 'adviser') {
    schedules = MockDB.getSchedulesForUser(user.id);
  } else {
    schedules = MockDB.getAllSchedules();
  }

  const canCreate = user.role === 'admin' || user.role === 'adviser';
  const upcoming  = schedules.filter(s => s.status === 'Upcoming');
  const done      = schedules.filter(s => s.status === 'Done');

  content.innerHTML = `
    <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <h2>📅 Schedules</h2>
        <p>Thesis consultations, defenses, and key dates.</p>
      </div>
      ${canCreate ? `<button class="btn-primary btn-sm" onclick="openCreateScheduleModal()">＋ Add Schedule</button>` : ''}
    </div>

    ${upcoming.length > 0 ? `
    <div style="margin-bottom:28px;">
      <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;margin-bottom:14px;color:var(--primary-2);">🔔 Upcoming (${upcoming.length})</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        ${upcoming.map(s => renderScheduleCard(s, user, 'upcoming')).join('')}
      </div>
    </div>` : ''}

    ${done.length > 0 ? `
    <div>
      <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;margin-bottom:14px;color:var(--text-3);">✅ Past Events (${done.length})</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        ${done.map(s => renderScheduleCard(s, user, 'done')).join('')}
      </div>
    </div>` : ''}

    ${schedules.length === 0 ? `
    <div class="empty-state"><div class="empty-icon">📅</div><h3>No Schedules Yet</h3><p>No events have been scheduled.</p></div>` : ''}
  `;
}

function renderScheduleCard(s, user, type) {
  const group   = MockDB.getGroupById(s.groupId);
  const typeIcons = { 'Consultation': '💬', 'Defense': '🎤', 'Final Defense': '🏆' };
  const icon = typeIcons[s.type] || '📅';
  const isPast = type === 'done';

  return `
    <div class="card" style="padding:20px;opacity:${isPast?'0.7':'1'};border-color:${isPast?'var(--glass-border)':'rgba(124,109,240,0.25)'};">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
        <span style="font-size:28px;">${icon}</span>
        ${statusBadge(s.status)}
      </div>
      <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;margin-bottom:6px;">${s.title}</div>
      ${group ? `<div style="font-size:0.78rem;color:var(--primary-2);margin-bottom:10px;">${group.title.slice(0,40)}…</div>` : ''}
      <div style="display:flex;flex-direction:column;gap:6px;font-size:0.83rem;color:var(--text-2);">
        <div>📆 <strong>${s.date}</strong> · ${s.time}</div>
        <div>📍 ${s.venue}</div>
        <div>👥 ${s.attendees.length} attendees</div>
      </div>
      ${s.description ? `<div style="margin-top:10px;font-size:0.8rem;color:var(--text-3);border-top:1px solid var(--glass-border);padding-top:10px;">${s.description}</div>` : ''}
      ${user.role !== 'student' && !isPast ? `
        <div style="margin-top:12px;display:flex;gap:6px;">
          <button class="btn-sm btn-success-sm" onclick="markScheduleDone('${s.id}')">Mark Done</button>
        </div>` : ''}
    </div>`;
}

function markScheduleDone(schedId) {
  const s = MockDB.getAllSchedules().find(s => s.id === schedId);
  if (s) s.status = 'Done';
  showToast('Schedule marked as done!', 'success');
  renderSchedules(getCurrentUser());
}

function openCreateScheduleModal() {
  const groups = MockDB.getAllGroups();
  const user   = getCurrentUser();
  const myGroups = user.role === 'adviser'
    ? MockDB.getGroupsByAdviserId(user.id)
    : groups;

  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Event Title</label><input type="text" id="sch-title" placeholder="e.g., Chapter 1 Defense" /></div>
      <div class="form-group"><label>Group</label>
        <select id="sch-group">
          <option value="">Select Group</option>
          ${myGroups.map(g=>`<option value="${g.id}">${g.title.slice(0,50)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Event Type</label>
        <select id="sch-type">
          ${['Consultation','Defense','Final Defense'].map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group"><label>Date</label><input type="date" id="sch-date" /></div>
        <div class="form-group"><label>Time</label><input type="time" id="sch-time" /></div>
      </div>
      <div class="form-group"><label>Venue</label><input type="text" id="sch-venue" placeholder="e.g., Room 301, IT Building" /></div>
      <div class="form-group"><label>Description (optional)</label><textarea id="sch-desc" placeholder="Additional details..."></textarea></div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="createSchedule()">Create</button>
      </div>
    </div>`, 'Add Schedule');
}

function createSchedule() {
  const title   = document.getElementById('sch-title').value.trim();
  const groupId = document.getElementById('sch-group').value;
  const type    = document.getElementById('sch-type').value;
  const date    = document.getElementById('sch-date').value;
  const time    = document.getElementById('sch-time').value;
  const venue   = document.getElementById('sch-venue').value.trim();
  const desc    = document.getElementById('sch-desc').value.trim();

  if (!title || !groupId || !date || !time || !venue) {
    showToast('Please fill in all required fields.', 'warning'); return;
  }

  const group   = MockDB.getGroupById(groupId);
  const attendees = [...(group ? group.memberIds : []), getCurrentUser().id];

  const timeFormatted = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  MockDB.addSchedule({
    id: MockDB.genId('sch'),
    groupId, title, type, date,
    time: timeFormatted,
    venue, description: desc,
    status: 'Upcoming',
    attendees,
    createdBy: getCurrentUser().id
  });

  closeModal();
  showToast('Schedule created!', 'success');
  renderSchedules(getCurrentUser());
}
