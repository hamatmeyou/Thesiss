// ── APP ENTRY ────────────────────────────────────────────────

function bootApp() {
  const user = getCurrentUser();
  if (!user) return;

  // Swap screens
  document.getElementById('screen-auth').classList.remove('active');
  document.getElementById('screen-auth').classList.add('hidden');
  document.getElementById('screen-app').classList.remove('hidden');
  document.getElementById('screen-app').classList.add('active');

  // Populate sidebar user info
  document.getElementById('sidebar-name').textContent   = user.name;
  document.getElementById('sidebar-role').textContent   = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  document.getElementById('sidebar-avatar').textContent = user.avatar || user.name[0];

  // Notification badge
  const count = MockDB.getUnreadCount(user.id);
  const badge = document.getElementById('notif-badge');
  badge.textContent = count > 0 ? count : '';
  if (count === 0) badge.style.display = 'none';

  // Build sidebar nav
  buildSidebar(user);

  // Navigate to dashboard
  navigateTo('dashboard');

  showToast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
}

// On page load
window.addEventListener('DOMContentLoaded', () => {
  if (tryRestoreSession()) {
    bootApp();
  }
});
