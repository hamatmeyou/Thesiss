// ── UI HELPERS ───────────────────────────────────────────────

// Toast
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

// Modal
function openModal(contentHTML, title = '') {
  const overlay = document.getElementById('modal-overlay');
  const box     = document.getElementById('modal-content');
  box.innerHTML = title
    ? `<div class="modal-title">${title}</div>${contentHTML}`
    : contentHTML;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// Notifications panel
let notifOpen = false;
function toggleNotifications() {
  const user = getCurrentUser();
  if (!user) return;

  if (notifOpen) {
    const panel = document.getElementById('notif-panel');
    if (panel) panel.remove();
    notifOpen = false;
    return;
  }

  notifOpen = true;
  MockDB.markAllRead(user.id);
  document.getElementById('notif-badge').textContent = '0';

  const notifs = MockDB.getNotificationsForUser(user.id);
  const panel  = document.createElement('div');
  panel.id = 'notif-panel';
  panel.style.cssText = `
    position:fixed; top:64px; right:16px; width:320px;
    background:var(--bg-2); border:1px solid var(--glass-border);
    border-radius:var(--radius); box-shadow:var(--shadow);
    z-index:500; overflow:hidden; animation:slideUp 0.2s ease;
  `;

  const icons = { feedback: '💬', schedule: '📅', submission: '📄', approval: '✅' };
  const items = notifs.length ? notifs.map(n => `
    <div style="padding:12px 16px; border-bottom:1px solid var(--glass-border); cursor:pointer;"
         onclick="navigateTo('${n.link}'); document.getElementById('notif-panel').remove(); notifOpen=false;">
      <div style="display:flex; gap:10px; align-items:flex-start;">
        <span style="font-size:18px;">${icons[n.type] || '🔔'}</span>
        <div>
          <div style="font-size:0.88rem; font-weight:600;">${n.title}</div>
          <div style="font-size:0.8rem; color:var(--text-2); margin-top:3px;">${n.message}</div>
          <div style="font-size:0.72rem; color:var(--text-3); margin-top:4px;">${formatDate(n.createdAt)}</div>
        </div>
      </div>
    </div>
  `).join('') : `<div style="padding:24px; text-align:center; color:var(--text-3); font-size:0.88rem;">No notifications</div>`;

  panel.innerHTML = `
    <div style="padding:14px 16px; border-bottom:1px solid var(--glass-border); font-weight:700; font-family:'Outfit',sans-serif;">
      🔔 Notifications
    </div>
    <div style="max-height:360px; overflow-y:auto;">${items}</div>
  `;
  document.body.appendChild(panel);

  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!panel.contains(e.target)) {
        panel.remove();
        notifOpen = false;
        document.removeEventListener('click', handler);
      }
    });
  }, 100);
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (window.innerWidth <= 768) {
    const isOpen = sidebar.classList.toggle('mobile-open');
    if (overlay) {
      overlay.classList.toggle('active', isOpen);
    }
  } else {
    sidebar.classList.toggle('collapsed');
    const labels = sidebar.querySelectorAll('.nav-label, .nav-section-label, .brand-title-sm, .user-info');
    labels.forEach(el => el.style.display = sidebar.classList.contains('collapsed') ? 'none' : '');
  }
}

// Date helpers
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return dateStr; }
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleString('en-PH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return dateStr; }
}

// Status badge helper
function statusBadge(status) {
  const map = {
    'Approved':    'badge-success',
    'Done':        'badge-success',
    'Reviewed':    'badge-success',
    'Pending':     'badge-warning',
    'Upcoming':    'badge-warning',
    'For Review':  'badge-warning',
    'In Progress': 'badge-primary',
    'Rejected':    'badge-danger',
    'Cancelled':   'badge-danger',
  };
  const cls = map[status] || 'badge-muted';
  return `<span class="badge ${cls}">${status}</span>`;
}

// User name helper
function userName(userId) {
  const u = MockDB.getUserById(userId);
  return u ? u.name : 'Unknown';
}

// Confirm dialog
let confirmCallback = null;
function confirmAction(message, onConfirm) {
  confirmCallback = onConfirm;
  openModal(`
    <div style="text-align:center; padding:8px 0;">
      <div style="font-size:48px; margin-bottom:16px;">⚠️</div>
      <div style="font-size:1rem; font-weight:600; margin-bottom:8px;">Are you sure?</div>
      <div style="font-size:0.88rem; color:var(--text-2); margin-bottom:24px;">${message}</div>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="executeConfirm()">Confirm</button>
      </div>
    </div>
  `);
}

function executeConfirm() {
  closeModal();
  if (typeof confirmCallback === 'function') {
    confirmCallback();
    confirmCallback = null;
  }
}
