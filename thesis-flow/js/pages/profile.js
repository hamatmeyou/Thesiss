// ── PROFILE PAGE ───────────────────────────────────────────────

function renderProfile(user) {
  const content = document.getElementById('page-content');

  content.innerHTML = `
    <div class="page-header">
      <h2>👤 User Profile</h2>
      <p>View and manage your account information.</p>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 2fr; gap:24px; align-items: start;">
      <!-- Profile Sidebar -->
      <div class="card" style="text-align:center; padding:32px;">
        <div style="width:100px; height:100px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--accent)); margin: 0 auto 20px; display:flex; align-items:center; justify-content:center; font-size:2.5rem; font-weight:800; color:#fff; box-shadow: 0 0 20px rgba(124, 109, 240, 0.4);">
          ${user.avatar}
        </div>
        <h3 style="font-family:'Outfit',sans-serif; font-size:1.4rem; margin-bottom:4px;">${user.name}</h3>
        <div style="text-transform:uppercase; font-size:0.75rem; font-weight:700; color:var(--primary-2); letter-spacing:0.1em;">${user.role}</div>
        
        <div style="margin-top:24px; text-align:left; border-top:1px solid var(--glass-border); padding-top:20px;">
          <div style="margin-bottom:12px;">
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; margin-bottom:4px;">Email Address</div>
            <div style="font-size:0.9rem;">${user.email}</div>
          </div>
          <div style="margin-bottom:12px;">
            <div style="font-size:0.7rem; color:var(--text-3); text-transform:uppercase; margin-bottom:4px;">Member Since</div>
            <div style="font-size:0.9rem;">${formatDate(user.createdAt)}</div>
          </div>
        </div>
      </div>

      <!-- Settings / Details -->
      <div class="card" style="padding:32px;">
        <h4 style="font-family:'Outfit',sans-serif; margin-bottom:20px;">Account Details</h4>
        <div class="modal-form">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="prof-name" value="${user.name}" />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="prof-email" value="${user.email}" readonly style="opacity:0.6; cursor:not-allowed;" />
          </div>
          
          ${user.role === 'student' ? `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
              <div class="form-group">
                <label>Program</label>
                <input type="text" id="prof-program" value="${user.program || ''}" />
              </div>
              <div class="form-group">
                <label>Year Level</label>
                <select id="prof-year">
                  <option value="3rd Year" ${user.yearLevel === '3rd Year' ? 'selected' : ''}>3rd Year</option>
                  <option value="4th Year" ${user.yearLevel === '4th Year' ? 'selected' : ''}>4th Year</option>
                </select>
              </div>
            </div>
          ` : user.role === 'adviser' || user.role === 'panelist' || user.role === 'capstone_head' || user.role === 'student_assistant' ? `
            <div class="form-group">
              <label>Department</label>
              <input type="text" id="prof-dept" value="${user.department || ''}" />
            </div>
            <div class="form-group">
              <label>${user.role === 'adviser' ? 'Specialization' : 'Position'}</label>
              <input type="text" id="prof-spec" value="${user.role === 'adviser' ? (user.specialization || '') : (user.position || '')}" />
            </div>
          ` : ''}

          <div style="margin-top:10px;">
            <button class="btn-primary" onclick="updateProfile()">Save Changes</button>
          </div>
        </div>

        <div style="margin-top:40px; border-top:1px solid var(--glass-border); padding-top:24px;">
          <h4 style="font-family:'Outfit',sans-serif; margin-bottom:12px; color:var(--danger);">Danger Zone</h4>
          <p style="font-size:0.85rem; color:var(--text-3); margin-bottom:16px;">Once you delete your account, there is no going back. Please be certain.</p>
          <button class="btn-sm btn-danger-sm" onclick="showToast('Deleting accounts is disabled in demo mode.', 'warning')">Delete Account</button>
        </div>
      </div>
    </div>
  `;
}

function updateProfile() {
  const user = getCurrentUser();
  const name = document.getElementById('prof-name').value.trim();
  
  if (!name) { showToast('Name cannot be empty.', 'warning'); return; }
  
  user.name = name;
  if (user.role === 'student') {
    user.program = document.getElementById('prof-program').value.trim();
    user.yearLevel = document.getElementById('prof-year').value.trim();
  } else if (user.role === 'adviser') {
    user.department = document.getElementById('prof-dept').value.trim();
    user.specialization = document.getElementById('prof-spec').value.trim();
  } else if (user.role === 'panelist' || user.role === 'capstone_head' || user.role === 'student_assistant') {
    user.department = document.getElementById('prof-dept').value.trim();
    user.position = document.getElementById('prof-spec').value.trim();
  }
  
  // Update avatar
  user.avatar = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  
  // Update sidebar info
  document.getElementById('sidebar-name').textContent = user.name;
  document.getElementById('sidebar-avatar').textContent = user.avatar;
  
  showToast('Profile updated successfully!', 'success');
  renderProfile(user);
}
