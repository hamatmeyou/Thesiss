// ── ROUTER ───────────────────────────────────────────────────

const ROUTES = {
  student: [
    { id: 'dashboard',   label: 'Dashboard',   icon: '🏠' },
    { id: 'groups',      label: 'My Group',     icon: '👥' },
    { id: 'submissions', label: 'Submissions',  icon: '📄' },
    { id: 'schedules',   label: 'Schedules',    icon: '📅' },
    { id: 'feedback',    label: 'Feedback',     icon: '💬' },
    { id: 'profile',     label: 'My Profile',   icon: '👤' },
  ],
  adviser: [
    { id: 'dashboard',   label: 'Dashboard',   icon: '🏠' },
    { id: 'groups',      label: 'My Groups',    icon: '👥' },
    { id: 'submissions', label: 'Submissions',  icon: '📄' },
    { id: 'schedules',   label: 'Schedules',    icon: '📅' },
    { id: 'feedback',    label: 'Feedback',     icon: '💬' },
    { id: 'profile',     label: 'My Profile',   icon: '👤' },
  ],
  admin: [
    { id: 'dashboard',   label: 'Dashboard',   icon: '🏠' },
    { id: 'groups',      label: 'All Groups',   icon: '👥' },
    { id: 'submissions', label: 'Submissions',  icon: '📄' },
    { id: 'schedules',   label: 'Schedules',    icon: '📅' },
    { id: 'users',       label: 'Users',        icon: '🛡️' },
    { id: 'profile',     label: 'My Profile',   icon: '👤' },
  ]
};

let currentPage = 'dashboard';

function buildSidebar(user) {
  const nav    = document.getElementById('sidebar-nav');
  const routes = ROUTES[user.role] || ROUTES.student;

  nav.innerHTML = routes.map(r => `
    <div class="nav-item ${r.id === currentPage ? 'active' : ''}"
         id="nav-${r.id}"
         onclick="navigateTo('${r.id}')">
      <span class="nav-icon">${r.icon}</span>
      <span class="nav-label">${r.label}</span>
    </div>
  `).join('');
}

function updateSidebarActive(pageId) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const active = document.getElementById(`nav-${pageId}`);
  if (active) active.classList.add('active');
}

function navigateTo(pageId) {
  currentPage = pageId;
  updateSidebarActive(pageId);

  const titleEl = document.getElementById('topbar-title');
  const user    = getCurrentUser();
  const routes  = ROUTES[user.role] || ROUTES.student;
  const route   = routes.find(r => r.id === pageId);
  if (titleEl && route) titleEl.textContent = route.label;

  const content = document.getElementById('page-content');
  content.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-3);">Loading...</div>`;

  // Close mobile sidebar
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 768) sidebar.classList.remove('mobile-open');

  // Render correct page
  switch (pageId) {
    case 'dashboard':   renderDashboard(user); break;
    case 'groups':      renderGroups(user);    break;
    case 'submissions': renderSubmissions(user); break;
    case 'schedules':   renderSchedules(user); break;
    case 'feedback':    renderFeedback(user);  break;
    case 'users':       renderUsers(user);     break;
    case 'profile':     renderProfile(user);   break;
    default:
      content.innerHTML = `<div class="empty-state"><div class="empty-icon">🚧</div><h3>Coming Soon</h3><p>This page is under construction.</p></div>`;
  }
}
