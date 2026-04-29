// ── DASHBOARD PAGE ───────────────────────────────────────────

function renderDashboard(user) {
  const content = document.getElementById('page-content');
  const stats   = MockDB.getStats();

  let statsCards = '';
  let mainSection = '';

  if (user.role === 'admin') {
    statsCards = `
      <div class="stats-grid">
        <div class="stat-card" onclick="navigateTo('users')" style="cursor:pointer;"><span class="stat-icon">👤</span><div class="stat-info"><div class="stat-value">${stats.totalStudents}</div><div class="stat-label">Total Students</div></div></div>
        <div class="stat-card" onclick="navigateTo('users')" style="cursor:pointer;"><span class="stat-icon">🎓</span><div class="stat-info"><div class="stat-value">${stats.totalAdvisers}</div><div class="stat-label">Faculty Advisers</div></div></div>
        <div class="stat-card" onclick="navigateTo('groups')" style="cursor:pointer;"><span class="stat-icon">👥</span><div class="stat-info"><div class="stat-value">${stats.totalGroups}</div><div class="stat-label">Thesis Groups</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">📄</span><div class="stat-info"><div class="stat-value">${stats.totalSubmissions}</div><div class="stat-label">Total Submissions</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">⏳</span><div class="stat-info"><div class="stat-value">${stats.pendingSubmissions}</div><div class="stat-label">Pending Reviews</div></div></div>
        <div class="stat-card" onclick="navigateTo('schedules')" style="cursor:pointer;"><span class="stat-icon">📅</span><div class="stat-info"><div class="stat-value">${stats.upcomingSchedules}</div><div class="stat-label">Upcoming Schedules</div></div></div>
      </div>`;

    const recentGroups = MockDB.getAllGroups().slice(0, 4);
    mainSection = `
      <div class="card" onclick="navigateTo('groups')" style="cursor:pointer;">
        <div class="card-header"><div class="card-title">📋 Recent Thesis Groups</div><button class="btn-sm btn-outline" onclick="event.stopPropagation(); navigateTo('groups')">View All</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Status</th><th>Adviser</th><th>Members</th></tr></thead>
            <tbody>
              ${recentGroups.map(g => `
                <tr>
                  <td><div style="font-weight:500;max-width:280px;">${g.title}</div><div style="font-size:0.78rem;color:var(--text-3);margin-top:2px;">${g.program}</div></td>
                  <td>${statusBadge(g.status)}</td>
                  <td>${g.adviserId ? userName(g.adviserId) : '<span style="color:var(--text-3);">Unassigned</span>'}</td>
                  <td>${g.memberIds.length}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;

  } else if (user.role === 'adviser') {
    const myGroups = MockDB.getGroupsByAdviserId(user.id);
    const mySubs   = MockDB.getSubmissionsForAdviser(user.id);
    const pending  = mySubs.filter(s => s.status === 'Pending').length;
    const myScheds = MockDB.getSchedulesForUser(user.id);
    const upcoming = myScheds.filter(s => s.status === 'Upcoming').length;

    statsCards = `
      <div class="stats-grid">
        <div class="stat-card" onclick="navigateTo('groups')" style="cursor:pointer;"><span class="stat-icon">👥</span><div class="stat-info"><div class="stat-value">${myGroups.length}</div><div class="stat-label">My Groups</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">📄</span><div class="stat-info"><div class="stat-value">${mySubs.length}</div><div class="stat-label">Total Submissions</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">⏳</span><div class="stat-info"><div class="stat-value">${pending}</div><div class="stat-label">Pending Reviews</div></div></div>
        <div class="stat-card" onclick="navigateTo('schedules')" style="cursor:pointer;"><span class="stat-icon">📅</span><div class="stat-info"><div class="stat-value">${upcoming}</div><div class="stat-label">Upcoming Schedules</div></div></div>
      </div>`;

    const pendingSubs = mySubs.filter(s => s.status === 'Pending').slice(0, 5);
    mainSection = `
      <div class="card" onclick="navigateTo('submissions')" style="cursor:pointer;">
        <div class="card-header"><div class="card-title">⏳ Submissions Awaiting Review</div><button class="btn-sm btn-outline" onclick="event.stopPropagation(); navigateTo('submissions')">View All</button></div>
        ${pendingSubs.length === 0
          ? '<div class="empty-state"><div class="empty-icon">✅</div><h3>All Caught Up!</h3><p>No pending submissions to review.</p></div>'
          : `<div class="table-wrap"><table>
              <thead><tr><th>Title</th><th>Group</th><th>Type</th><th>Submitted</th><th>Action</th></tr></thead>
              <tbody>${pendingSubs.map(s => {
                const g = MockDB.getGroupById(s.groupId);
                return `<tr>
                  <td><div style="font-weight:500;">${s.title}</div></td>
                  <td style="font-size:0.85rem;color:var(--text-2);">${g ? g.title.slice(0, 30) + '…' : '—'}</td>
                  <td><span class="badge badge-muted">${s.type}</span></td>
                  <td style="font-size:0.82rem;color:var(--text-3);">${formatDate(s.submittedAt)}</td>
                  <td><button class="btn-sm btn-success-sm" onclick="navigateTo('submissions')">Review</button></td>
                </tr>`;}).join('')}
              </tbody></table></div>`}
      </div>
      
      <div class="card" style="margin-top:20px;">
        <div class="card-header"><div class="card-title">📈 Group Progress Overview</div><button class="btn-sm btn-outline" onclick="navigateTo('groups')">Manage Groups</button></div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
          ${myGroups.map(g => {
            const perc = Math.round((g.progress.currentStage / (g.progress.stages.length - 1)) * 100);
            return `
            <div onclick="navigateTo('groups')" style="cursor:pointer; background:var(--bg-2); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--glass-border);">
              <div style="font-size:0.7rem; color:var(--primary-2); font-weight:700; text-transform:uppercase; margin-bottom:4px;">${g.phase}</div>
              <div style="font-weight:600; font-size:0.9rem; margin-bottom:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${g.title}</div>
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:6px;">
                <span style="color:var(--text-2);">${g.progress.stages[g.progress.currentStage]}</span>
                <span style="color:var(--primary); font-weight:700;">${perc}%</span>
              </div>
              <div style="height:4px; background:rgba(255,255,255,0.05); border-radius:2px; overflow:hidden;">
                <div style="width:${perc}%; height:100%; background:var(--primary);"></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;

  } else if (user.role === 'capstone_head') {
    const allGroups = MockDB.getAllGroups();
    const allSubs = MockDB.getAllSubmissions();
    const pendingSubs = allSubs.filter(s => s.status === 'Pending').length;
    const allSchedules = MockDB.getAllSchedules();
    const upcomingSchedules = allSchedules.filter(s => s.status === 'Upcoming').length;

    statsCards = `
      <div class="stats-grid">
        <div class="stat-card" onclick="navigateTo('groups')" style="cursor:pointer;"><span class="stat-icon">👥</span><div class="stat-info"><div class="stat-value">${allGroups.length}</div><div class="stat-label">All Groups</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">📄</span><div class="stat-info"><div class="stat-value">${allSubs.length}</div><div class="stat-label">All Submissions</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">⏳</span><div class="stat-info"><div class="stat-value">${pendingSubs}</div><div class="stat-label">Pending Reviews</div></div></div>
        <div class="stat-card" onclick="navigateTo('schedules')" style="cursor:pointer;"><span class="stat-icon">📅</span><div class="stat-info"><div class="stat-value">${upcomingSchedules}</div><div class="stat-label">Upcoming Schedules</div></div></div>
      </div>`;

    mainSection = `
      <div class="card" onclick="navigateTo('groups')" style="cursor:pointer;">
        <div class="card-header"><div class="card-title">🎓 Capstone Monitoring Overview</div><button class="btn-sm btn-outline" onclick="event.stopPropagation(); navigateTo('groups')">View All Groups</button></div>
        <p style="font-size:0.88rem;color:var(--text-2);">You have full monitoring visibility across thesis progress, submissions, and schedules.</p>
      </div>`;

  } else if (user.role === 'student_assistant') {
    const allGroups = MockDB.getAllGroups();
    const allSubs = MockDB.getAllSubmissions();
    const pendingSubs = allSubs.filter(s => s.status === 'Pending').length;
    const allSchedules = MockDB.getAllSchedules();
    const upcomingSchedules = allSchedules.filter(s => s.status === 'Upcoming').length;
    const recentGroups = allGroups.slice(0, 5);

    statsCards = `
      <div class="stats-grid">
        <div class="stat-card" onclick="navigateTo('groups')" style="cursor:pointer;"><span class="stat-icon">👥</span><div class="stat-info"><div class="stat-value">${allGroups.length}</div><div class="stat-label">All Groups</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">📄</span><div class="stat-info"><div class="stat-value">${allSubs.length}</div><div class="stat-label">Submissions Logged</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">⏳</span><div class="stat-info"><div class="stat-value">${pendingSubs}</div><div class="stat-label">Pending Reviews</div></div></div>
        <div class="stat-card" onclick="navigateTo('schedules')" style="cursor:pointer;"><span class="stat-icon">📅</span><div class="stat-info"><div class="stat-value">${upcomingSchedules}</div><div class="stat-label">Upcoming Schedules</div></div></div>
      </div>`;

    mainSection = `
      <div class="card">
        <div class="card-header"><div class="card-title">📋 Group Monitoring Snapshot</div><button class="btn-sm btn-outline" onclick="navigateTo('groups')">Open Groups</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Group</th><th>Phase</th><th>Status</th><th>Adviser</th></tr></thead>
            <tbody>
              ${recentGroups.map(g => `
                <tr>
                  <td><div style="font-weight:500;max-width:280px;">${g.title}</div><div style="font-size:0.78rem;color:var(--text-3);margin-top:2px;">${g.program}</div></td>
                  <td>${g.phase}</td>
                  <td>${statusBadge(g.status)}</td>
                  <td>${g.adviserId ? userName(g.adviserId) : '<span style="color:var(--text-3);">Unassigned</span>'}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;

  } else {
    // Student
    const group   = MockDB.getGroupByUserId(user.id);
    const subs    = group ? MockDB.getSubmissionsByGroup(group.id) : [];
    const scheds  = group ? MockDB.getSchedulesByGroup(group.id) : [];
    const feedbk  = group ? MockDB.getFeedbackByGroup(group.id) : [];
    const upcoming = scheds.filter(s => s.status === 'Upcoming');

    statsCards = `
      <div class="stats-grid">
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">📄</span><div class="stat-info"><div class="stat-value">${subs.length}</div><div class="stat-label">Submissions</div></div></div>
        <div class="stat-card" onclick="navigateTo('submissions')" style="cursor:pointer;"><span class="stat-icon">✅</span><div class="stat-info"><div class="stat-value">${subs.filter(s=>s.status==='Approved'||s.status==='Reviewed').length}</div><div class="stat-label">Reviewed</div></div></div>
        <div class="stat-card" onclick="navigateTo('schedules')" style="cursor:pointer;"><span class="stat-icon">📅</span><div class="stat-info"><div class="stat-value">${upcoming.length}</div><div class="stat-label">Upcoming Events</div></div></div>
        <div class="stat-card" onclick="navigateTo('feedback')" style="cursor:pointer;"><span class="stat-icon">💬</span><div class="stat-info"><div class="stat-value">${feedbk.length}</div><div class="stat-label">Feedback Received</div></div></div>
      </div>`;

    const nextSched = upcoming[0];
    const recentFb  = feedbk.slice(-2).reverse();

    // Check for missing submission for current stage
    const currentStage = group ? group.progress.stages[group.progress.currentStage] : '';
    const hasSubForStage = subs.some(s => 
      s.title.toLowerCase().includes(currentStage.toLowerCase()) || 
      (s.type === 'Chapter' && currentStage.toLowerCase().includes('chapter')) ||
      (s.type === 'Proposal' && currentStage.toLowerCase().includes('proposal'))
    );

    const submissionAlert = (group && !hasSubForStage) ? `
      <div class="card" style="background:rgba(251,191,36,0.08); border-color:rgba(251,191,36,0.3); margin-top:20px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="font-size:24px;">📄</div>
            <div>
              <div style="font-weight:700; color:var(--warning); font-size:0.95rem;">Pending Submission: ${currentStage}</div>
              <div style="font-size:0.82rem; color:var(--text-2); margin-top:2px;">You haven't uploaded your document for this stage yet.</div>
            </div>
          </div>
          <button class="btn-sm btn-primary" onclick="navigateTo('submissions')">Submit Now</button>
        </div>
      </div>` : '';

    mainSection = `
      ${submissionAlert}
      ${group ? `
      <div class="card" onclick="navigateTo('groups')" style="cursor:pointer; background:linear-gradient(135deg,rgba(124,109,240,0.12),rgba(192,132,252,0.08));border-color:rgba(124,109,240,0.2);">
        <div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">
          <div style="font-size:36px;">📘</div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:0.75rem;font-weight:600;color:var(--primary-2);text-transform:uppercase;letter-spacing:0.08em;">Your Thesis · ${group.phase}</div>
              <div style="font-size:0.75rem;font-weight:700;color:var(--success);">${Math.round((group.progress.currentStage / (group.progress.stages.length - 1)) * 100)}% Complete</div>
            </div>
            <div style="font-family:'Outfit',sans-serif;font-size:1.15rem;font-weight:700;margin:4px 0;">${group.title}</div>
            <div style="font-size:0.85rem;color:var(--text-2);">${group.program}</div>
            
            <!-- Progress Bar -->
            <div style="height:6px; background:rgba(255,255,255,0.05); border-radius:3px; margin: 15px 0 20px; overflow:hidden;">
              <div style="width:${(group.progress.currentStage / (group.progress.stages.length - 1)) * 100}%; height:100%; background:linear-gradient(90deg, var(--primary), var(--accent)); transition: width 1s ease;"></div>
            </div>

            <!-- Timeline -->
            <div class="progress-timeline">
              ${group.progress.stages.map((s, i) => {
                const isActive = i <= group.progress.currentStage;
                const isCurrent = i === group.progress.currentStage;
                return `
                <div class="progress-step">
                  <div class="step-dot ${isCurrent ? 'current' : isActive ? 'active' : ''}"></div>
                  <div class="step-label ${isActive ? 'active' : ''}">${s}</div>
                </div>`;
              }).join('')}
              <div class="progress-line"></div>
            </div>

            <div style="margin-top:20px;display:flex;gap:8px;flex-wrap:wrap;">
              ${statusBadge(group.status)}
              <span class="badge badge-muted">Adviser: ${group.adviserId ? userName(group.adviserId) : 'Unassigned'}</span>
            </div>
          </div>
        </div>
      </div>` : `
      <div class="card" style="text-align:center;padding:40px;">
        <div style="font-size:48px;margin-bottom:12px;">📭</div>
        <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1.1rem;margin-bottom:8px;">No Group Yet</div>
        <div style="color:var(--text-2);font-size:0.88rem;margin-bottom:20px;">You haven't been assigned to a thesis group.</div>
      </div>`}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px;">
        <div class="card" onclick="navigateTo('schedules')" style="cursor:pointer;">
          <div class="card-header"><div class="card-title">📅 Next Schedule</div></div>
          ${nextSched ? `
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="font-weight:600;">${nextSched.title}</div>
              <div style="font-size:0.85rem;color:var(--text-2);">${nextSched.date} · ${nextSched.time}</div>
              <div style="font-size:0.85rem;color:var(--text-2);">📍 ${nextSched.venue}</div>
              <span class="badge badge-warning" style="align-self:flex-start;">${nextSched.type}</span>
            </div>` : '<div class="empty-state" style="padding:24px 0;"><div class="empty-icon" style="font-size:32px;">📭</div><p>No upcoming schedules</p></div>'}
        </div>
        <div class="card" onclick="navigateTo('feedback')" style="cursor:pointer;">
          <div class="card-header"><div class="card-title">💬 Recent Feedback</div></div>
          ${recentFb.length ? recentFb.map(f => `
            <div style="padding:10px 0;border-bottom:1px solid var(--glass-border);">
              <div style="font-size:0.82rem;color:var(--text-2);">${f.content.slice(0, 100)}…</div>
              <div style="font-size:0.75rem;color:var(--text-3);margin-top:4px;">${userName(f.authorId)} · ${formatDate(f.createdAt)}</div>
            </div>`).join('')
          : '<div class="empty-state" style="padding:24px 0;"><div class="empty-icon" style="font-size:32px;">💬</div><p>No feedback yet</p></div>'}
        </div>
      </div>`;
  }

  content.innerHTML = `
    <div class="page-header">
      <h2>👋 Welcome back, ${user.name.split(' ')[0]}!</h2>
      <p>Here's an overview of your thesis progress.</p>
    </div>
    ${statsCards}
    ${mainSection}
  `;
}
