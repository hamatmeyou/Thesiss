// ── SCHEDULES PAGE ───────────────────────────────────────────

function renderSchedules(user) {
  const content = document.getElementById('page-content');
  const timelineItems = MockDB.getAllTimeline().sort((a, b) => new Date(a.date) - new Date(b.date));

  let schedules = [];
  if (user.role === 'student') {
    schedules = MockDB.getSchedulesForUser(user.id);
  } else if (user.role === 'adviser') {
    schedules = MockDB.getSchedulesForUser(user.id);
  } else if (user.role === 'panelist') {
    const assignedGroupIds = Array.isArray(user.assignedGroups) ? user.assignedGroups : [];
    schedules = MockDB.getAllSchedules().filter(s => assignedGroupIds.includes(s.groupId));
  } else {
    schedules = MockDB.getAllSchedules();
  }

  const canCreate = user.role === 'admin' || user.role === 'adviser';
  const canCreateTimeline = user.role === 'admin';
  const upcoming  = schedules.filter(s => s.status === 'Upcoming');
  const done      = schedules.filter(s => s.status === 'Done');

  content.innerHTML = `
    <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <h2>📅 Schedules</h2>
        <p>Thesis consultations, defenses, and key dates.</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${canCreateTimeline ? `<button class="btn-primary btn-sm" onclick="openCreateTimelineModal()">＋ Add Global Timeline</button>` : ''}
        ${canCreate ? `<button class="btn-primary btn-sm" onclick="openCreateScheduleModal()">＋ Add Schedule</button>` : ''}
      </div>
    </div>

    <div style="margin-bottom:28px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:14px;">
        <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;color:var(--primary-2);">🗂️ Global Timeline (Applies to Everyone)</div>
        <span class="badge badge-muted">${timelineItems.length} item${timelineItems.length === 1 ? '' : 's'}</span>
      </div>
      ${timelineItems.length === 0 ? `
        <div class="card" style="padding:18px;">
          <div style="font-size:0.88rem;color:var(--text-2);">No global timeline events yet.</div>
        </div>
      ` : `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
          ${timelineItems.map(t => renderTimelineCard(t)).join('')}
        </div>
      `}
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

function renderTimelineCard(item) {
  const typeBadgeClass = item.type === 'Deadline' ? 'badge-warning' : 'badge-primary';
  return `
    <div class="card" style="padding:20px;border-color:rgba(95,143,79,0.28);">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px;">
        <span class="badge ${typeBadgeClass}">${item.type}</span>
        <span style="font-size:0.78rem;color:var(--text-3);">${formatDate(item.date)}</span>
      </div>
      <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;margin-bottom:8px;">${item.title}</div>
      <div style="font-size:0.84rem;color:var(--text-2);">${item.description || 'No additional details.'}</div>
    </div>
  `;
}

function renderScheduleCard(s, user, type) {
  const group   = MockDB.getGroupById(s.groupId);
  const typeIcons = { 'Consultation': '💬', 'Defense': '🎤', 'Final Defense': '🏆', 'Appointment': '📌' };
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
      ${(user.role === 'admin' || user.role === 'adviser') && !isPast ? `
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
          ${['Consultation','Appointment','Defense','Final Defense'].map(t=>`<option>${t}</option>`).join('')}
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
  const user = getCurrentUser();
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

  if (user.role === 'adviser') {
    const allowedGroupIds = MockDB.getGroupsByAdviserId(user.id).map(g => g.id);
    if (!allowedGroupIds.includes(groupId)) {
      showToast('You can only schedule meetings for your assigned groups.', 'warning');
      return;
    }
  }

  const group   = MockDB.getGroupById(groupId);
  const attendees = [...(group ? group.memberIds : []), user.id];

  const timeFormatted = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  MockDB.addSchedule({
    id: MockDB.genId('sch'),
    groupId, title, type, date,
    time: timeFormatted,
    venue, description: desc,
    status: 'Upcoming',
    attendees,
    createdBy: user.id
  });

  if (group && (user.role === 'adviser' || user.role === 'admin')) {
    group.memberIds.forEach(studentId => {
      MockDB.addNotification({
        id: MockDB.genId('n'),
        userId: studentId,
        title: type === 'Appointment' ? 'New Adviser Appointment' : 'New Schedule Added',
        message: `${user.name} scheduled ${type === 'Appointment' ? 'an appointment' : 'a meeting'} for ${group.title.slice(0, 40)}... on ${date} at ${timeFormatted}.`,
        type: 'schedule',
        read: false,
        createdAt: new Date().toISOString(),
        link: 'schedules'
      });
    });
  }

  closeModal();
  showToast(type === 'Appointment' ? 'Appointment created and students notified!' : 'Schedule created!', 'success');
  renderSchedules(user);
}

function openCreateTimelineModal() {
  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Timeline Title</label><input type="text" id="tl-title" placeholder="e.g., Proposal Deadline" /></div>
      <div class="form-group"><label>Type</label>
        <select id="tl-type">
          ${['Deadline', 'Milestone', 'Announcement'].map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Date</label><input type="date" id="tl-date" /></div>
      <div class="form-group"><label>Description (optional)</label><textarea id="tl-desc" placeholder="Additional notes for everyone..."></textarea></div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="createTimelineItem()">Create Timeline Item</button>
      </div>
    </div>`, 'Add Global Timeline');
}

function createTimelineItem() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    showToast('Only admins can add global timeline events.', 'warning');
    return;
  }

  const title = document.getElementById('tl-title').value.trim();
  const type = document.getElementById('tl-type').value;
  const date = document.getElementById('tl-date').value;
  const description = document.getElementById('tl-desc').value.trim();

  if (!title || !date) {
    showToast('Please provide title and date.', 'warning');
    return;
  }

  MockDB.addTimeline({
    id: MockDB.genId('tl'),
    title,
    type,
    date,
    description,
    createdBy: user.id
  });

  closeModal();
  showToast('Global timeline event created!', 'success');
  renderSchedules(user);
}
