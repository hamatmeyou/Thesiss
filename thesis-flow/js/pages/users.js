// ── USERS PAGE (ADMIN ONLY) ──────────────────────────────────

function renderUsers(user) {
  if (user.role !== 'admin') {
    document.getElementById('page-content').innerHTML = `
      <div class="empty-state"><div class="empty-icon">⛔</div><h3>Access Denied</h3><p>Only administrators can access this page.</p></div>`;
    return;
  }

  const content = document.getElementById('page-content');
  const allUsers = MockDB.getAllUsers();

  const students = allUsers.filter(u => u.role === 'student');
  const advisers = allUsers.filter(u => u.role === 'adviser');
  const admins   = allUsers.filter(u => u.role === 'admin');

  content.innerHTML = `
    <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <h2>🛡️ User Management</h2>
        <p>Manage students, faculty, and system administrators.</p>
      </div>
      <button class="btn-primary btn-sm" onclick="openAddUserModal()">＋ Add User</button>
    </div>

    <div style="display:flex;gap:10px;margin-bottom:20px;">
      <button class="btn-sm btn-primary" id="btn-tab-students" onclick="switchUserTab('students')">Students (${students.length})</button>
      <button class="btn-sm btn-outline" id="btn-tab-advisers" onclick="switchUserTab('advisers')">Faculty (${advisers.length})</button>
      <button class="btn-sm btn-outline" id="btn-tab-admins" onclick="switchUserTab('admins')">Admins (${admins.length})</button>
    </div>

    <div class="card" id="users-container">
      ${renderUsersTable(students)}
    </div>
  `;

  // Store globally for tabbing
  window._allUsers = {
    students, advisers, admins
  };
}

function switchUserTab(tab) {
  ['students', 'advisers', 'admins'].forEach(t => {
    const btn = document.getElementById('btn-tab-' + t);
    if (t === tab) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
    }
  });

  document.getElementById('users-container').innerHTML = renderUsersTable(window._allUsers[tab]);
}

function renderUsersTable(users) {
  if (users.length === 0) return `<div class="empty-state" style="padding:40px 0;"><p>No users found in this category.</p></div>`;

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Details</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;color:#fff;">${u.avatar}</div>
                  <div>
                    <div style="font-weight:600;">${u.name}</div>
                    <div style="font-size:0.75rem;color:var(--text-3);text-transform:uppercase;">${u.role}</div>
                  </div>
                </div>
              </td>
              <td>
                <div style="font-size:0.85rem;">${u.email}</div>
              </td>
              <td>
                <div style="font-size:0.85rem;">
                  ${u.role === 'student' ? (u.program || '—') : (u.department || '—')}
                </div>
                ${u.role === 'student' && u.groupId ? `<div style="font-size:0.75rem;color:var(--primary-2);">Has Group</div>` : ''}
              </td>
              <td style="font-size:0.85rem;color:var(--text-2);">${formatDate(u.createdAt)}</td>
              <td>
                <button class="btn-sm btn-outline" onclick="showToast('Edit user coming soon!', 'info')">Edit</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function openAddUserModal() {
  openModal(`
    <div class="modal-form">
      <div class="form-group"><label>Full Name</label><input type="text" id="nu-name" placeholder="Juan Dela Cruz" /></div>
      <div class="form-group"><label>Email Address</label><input type="email" id="nu-email" placeholder="email@university.edu" /></div>
      <div class="form-group"><label>Role</label>
        <select id="nu-role">
          <option value="student">Student</option>
          <option value="adviser">Faculty Adviser</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-group"><label>Year Level (for Students)</label>
        <select id="nu-year">
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </div>
      <div class="form-group"><label>Password</label><input type="password" id="nu-pass" value="demo1234" /></div>
      <div class="modal-actions">
        <button class="btn-sm btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-sm btn-primary" onclick="createUser()">Add User</button>
      </div>
    </div>
  `, 'Add New User');
}

function createUser() {
  const name  = document.getElementById('nu-name').value.trim();
  const email = document.getElementById('nu-email').value.trim();
  const role  = document.getElementById('nu-role').value;
  const year  = document.getElementById('nu-year').value;
  const pass  = document.getElementById('nu-pass').value;

  if (!name || !email || !pass) {
    showToast('Please fill all fields', 'warning'); return;
  }

  if (!email.toLowerCase().endsWith('@plmun.edu.ph')) {
    showToast('Email must be an official @plmun.edu.ph address', 'error'); return;
  }

  if (MockDB.getUserByEmail(email)) {
    showToast('Email already in use', 'error'); return;
  }

  MockDB.addUser({
    id: MockDB.genId('u'),
    name, email, password: pass, role,
    yearLevel: role === 'student' ? year : null,
    groupId: null,
    avatar: name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2),
    createdAt: new Date().toISOString().split('T')[0]
  });

  closeModal();
  showToast('User created successfully!', 'success');
  renderUsers(getCurrentUser());
}
