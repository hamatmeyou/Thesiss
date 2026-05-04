// === Data ===
const classData = [
  { id: 1, title: 'Advanced Web Systems', code: 'CS-402', teacher: 'Prof. Sarah Jenkins', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Artificial Intelligence', code: 'CS-301', teacher: 'Dr. James Wilson', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Cybersecurity Fundamentals', code: 'IT-305', teacher: 'Prof. Elena Rodriguez', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Cloud Infrastructure', code: 'IT-408', teacher: 'Dr. Michael Chen', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=600' }
];

const assignmentData = [
  { id: 1, title: 'Design Database Schema', class: 'CS-402', dueDate: '2026-05-10', status: 'pending', submitted: false },
  { id: 2, title: 'Neural Network Implementation', class: 'CS-301', dueDate: '2026-05-12', status: 'pending', submitted: false },
  { id: 3, title: 'Security Protocol Analysis', class: 'IT-305', dueDate: '2026-05-15', status: 'pending', submitted: true }
];

let currentAssignmentFilter = 'all';

const messageData = [
  { id: 1, sender: 'Sarah Jenkins', preview: 'The assignment deadline has been extended...', time: '2 hours ago', messages: ['The assignment deadline has been extended to next Friday.', 'Make sure to review the updated requirements.'] },
  { id: 2, sender: 'James Wilson', preview: 'Don\'t forget about the project review...', time: '4 hours ago', messages: ['Don\'t forget about the project review on Thursday.'] },
  { id: 3, sender: 'Study Group', preview: 'Meet up at the library tomorrow...', time: '1 day ago', messages: ['Meet up at the library tomorrow at 3 PM?'] }
];

const campusUsers = [
  { id: 'p1', name: 'Sarah Jenkins', email: 's.jenkins@university.edu', dept: 'Computer Science', role: 'Instructor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'p2', name: 'James Wilson', email: 'j.wilson@university.edu', dept: 'Computer Science', role: 'Instructor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'p3', name: 'Elena Rodriguez', email: 'e.rodriguez@university.edu', dept: 'Information Technology', role: 'Instructor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 's1', name: 'Michael Torres', email: 'm.torres@university.edu', dept: 'Computer Science', role: 'Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' }
];

const currentUser = {
  name: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  gpa: '3.85',
  major: 'Computer Science',
  role: 'student', // 'student', 'professor'
  year: 3, // 1, 2, 3, 4 for students
  isStudentAssistant: true, // Flag for student assistant
  professorRoles: [] // ['adviser', 'capstone_head'] for professors
};

// Test user for professor adviser (uncomment to test)
// const currentUser = {
//   name: 'Dr. Sarah Jenkins',
//   email: 's.jenkins@university.edu',
//   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
//   major: 'Computer Science',
//   role: 'professor',
//   year: null,
//   isStudentAssistant: false,
//   professorRoles: ['adviser']
// };

// === Router ===
const pages = {
  dashboard: renderDashboard,
  classes: renderClasses,
  assignments: renderAssignments,
  grades: renderGrades,
  messages: renderMessages,
  schedule: renderSchedule,
  groups: renderGroups,
  users: renderUsers,
  profile: renderProfile
};

let currentPage = 'dashboard';

// === Access Control ===
function canAccessPage(page) {
  return true; // All pages are accessible to all users
}

// === Navigation ===
let navItems = null;
function initNav() {
  navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      if (page) navigateTo(page);
    });
  });
}

function navigateTo(page) {
  // Check access control
  if (!canAccessPage(page)) {
    alert('🔒 Access Denied: You do not have permission to access this page.');
    return;
  }
  
  if (navItems) navItems.forEach(item => item.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  
  currentPage = page;
  if (pages[page]) {
    pages[page]();
  }
}

// === Dashboard ===
function renderDashboard() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome back, <span style="color: var(--secondary);">Alex</span>.</h1>
        <p class="text-muted">You have 4 active classes and 2 pending assignments today.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="navigateTo('assignments')">View Assignments</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>4</h3>
          <p>Active Classes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✏️</div>
        <div class="stat-content">
          <h3>2</h3>
          <p>Pending Assignments</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h3>3.85</h3>
          <p>Current GPA</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-content">
          <h3>3</h3>
          <p>Unread Messages</p>
        </div>
      </div>
    </div>

    <h2 class="mb-1">My Classes</h2>
    <div class="launchpad-grid animate-fade-in">
      ${classData.map((cls, i) => `
        <div class="glass-card class-card animate-fade-in" style="animation-delay: ${i * 0.1}s;">
          <img src="${cls.image}" class="class-card-bg" alt="${cls.title}">
          <div class="class-info">
            <h3 class="class-title">${cls.title}</h3>
            <p class="class-subtitle">${cls.code} • ${cls.teacher}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <h2 class="mb-1 mt-2">Upcoming Assignments</h2>
    <div class="glass-card animate-fade-in">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Class</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${assignmentData.map(a => `
              <tr>
                <td><strong>${a.title}</strong></td>
                <td>${a.class}</td>
                <td>${a.dueDate}</td>
                <td><span style="color: var(--secondary); font-weight: 600;">${a.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// === Classes ===
function renderClasses() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>My Classes</h1>
        <p class="text-muted">Manage your courses and access materials</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">Join Class</button>
        <button class="btn btn-secondary">Create Class</button>
      </div>
    </div>

    <div class="launchpad-grid animate-fade-in">
      ${classData.map((cls, i) => `
        <div class="glass-card class-card animate-fade-in" style="animation-delay: ${i * 0.1}s;">
          <img src="${cls.image}" class="class-card-bg" alt="${cls.title}">
          <div class="class-info">
            <h3 class="class-title">${cls.title}</h3>
            <p class="class-subtitle">${cls.code} • ${cls.teacher}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// === Assignments ===
function renderAssignments() {
  const pendingCount = assignmentData.filter(a => !a.submitted).length;
  const submittedCount = assignmentData.filter(a => a.submitted).length;

  const filteredData = assignmentData.filter(a => {
    if (currentAssignmentFilter === 'pending') return !a.submitted;
    if (currentAssignmentFilter === 'submitted') return a.submitted;
    return true;
  });

  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Assignments</h1>
        <p class="text-muted">Track your assignments and submissions</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <button class="btn ${currentAssignmentFilter === 'all' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterAssignments('all')">All (${assignmentData.length})</button>
        <button class="btn ${currentAssignmentFilter === 'pending' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterAssignments('pending')">Pending (${pendingCount})</button>
        <button class="btn ${currentAssignmentFilter === 'submitted' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterAssignments('submitted')">Submitted (${submittedCount})</button>
      </div>

      ${filteredData.map((a, i) => `
        <div class="glass-card assignment-card animate-fade-in" style="animation-delay: ${i * 0.1}s; background: rgba(20, 22, 35, 0.4); margin-bottom: 1rem;">
          <div class="assignment-info">
            <h3>${a.title}</h3>
            <p class="text-muted">${a.class}</p>
            <div class="due-date">Due ${a.dueDate}</div>
          </div>
          <button class="btn btn-primary btn-sm">${a.submitted ? 'Submitted' : 'Submit'}</button>
        </div>
      `).join('')}

      ${filteredData.length === 0 ? '<div class="empty-state"><h3>No assignments found</h3><p>Try changing your filter criteria.</p></div>' : ''}
    </div>
  `;
}

function filterAssignments(filter) {
  currentAssignmentFilter = filter;
  renderAssignments();
}

// === Grades ===
function renderGrades() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Grades</h1>
        <p class="text-muted">View your performance across all classes</p>
      </div>
    </div>

    <div class="grade-overview animate-fade-in">
      <div class="grade-card">
        <div class="grade-value">A-</div>
        <div class="grade-label">Advanced Web Systems</div>
      </div>
      <div class="grade-card">
        <div class="grade-value">A</div>
        <div class="grade-label">Artificial Intelligence</div>
      </div>
      <div class="grade-card">
        <div class="grade-value">B+</div>
        <div class="grade-label">Cybersecurity</div>
      </div>
      <div class="grade-card">
        <div class="grade-value">A</div>
        <div class="grade-label">Cloud Infrastructure</div>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>Detailed Grades</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Assignment</th>
              <th>Points</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS-402</td>
              <td>Midterm Exam</td>
              <td>45/50</td>
              <td><strong style="color: var(--secondary);">A-</strong></td>
            </tr>
            <tr>
              <td>CS-301</td>
              <td>Project Submission</td>
              <td>100/100</td>
              <td><strong style="color: var(--primary);">A</strong></td>
            </tr>
            <tr>
              <td>IT-305</td>
              <td>Quiz 1</td>
              <td>38/40</td>
              <td><strong style="color: #eab308;">B+</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// === Messages ===
function renderMessages() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Messages</h1>
        <p class="text-muted">Communicate with your instructors and peers</p>
      </div>
    </div>

    <div class="message-thread animate-fade-in">
      <div class="message-list">
        ${messageData.map((msg, i) => `
          <div class="message-item ${i === 0 ? 'active' : ''}" onclick="selectMessage(this, ${i})">
            <div class="message-item-header">
              <div class="message-item-name">${msg.sender}</div>
              <div class="message-item-time">${msg.time}</div>
            </div>
            <div class="message-item-preview">${msg.preview}</div>
          </div>
        `).join('')}
      </div>

      <div class="message-view animate-fade-in">
        <div class="message-header">
          <h3>${messageData[0].sender}</h3>
        </div>
        <div class="message-content" id="message-content">
          ${messageData[0].messages.map(msg => `
            <div class="message-bubble other">
              <div class="message-bubble-text">${msg}</div>
            </div>
          `).join('')}
          <div class="message-bubble own">
            <div class="message-bubble-text">Thanks for the update!</div>
          </div>
        </div>
        <div class="message-input">
          <input type="text" placeholder="Type a message...">
          <button class="btn btn-primary btn-sm">Send</button>
        </div>
      </div>
    </div>
  `;
}

function selectMessage(element, index) {
  document.querySelectorAll('.message-item').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
  const msg = messageData[index];
  document.querySelector('.message-header h3').textContent = msg.sender;
  document.getElementById('message-content').innerHTML = msg.messages.map(m => `
    <div class="message-bubble other">
      <div class="message-bubble-text">${m}</div>
    </div>
  `).join('');
}

// === Schedule ===
function renderSchedule() {
  const today = new Date();
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Schedule</h1>
        <p class="text-muted">View your classes and important dates</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>May 2026</h2>
      <div class="calendar-grid">
        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `<div style="text-align: center; padding: 0.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.8rem;">${day}</div>`).join('')}
        ${Array.from({length: 31}).map((_, i) => `
          <div class="calendar-day ${i + 1 === today.getDate() ? 'today' : ''}">
            ${i + 1}
          </div>
        `).join('')}
      </div>

      <div class="event-list">
        <h3 style="margin-top: 2rem;">Upcoming Events</h3>
        <div class="event-item">
          <div>
            <h3 style="margin: 0;">CS-402 Lecture</h3>
            <p class="text-muted">Room 301, Engineering Building</p>
          </div>
          <div class="event-time">May 5, 2:00 PM</div>
        </div>
        <div class="event-item">
          <div>
            <h3 style="margin: 0;">Assignment Due: Database Schema</h3>
            <p class="text-muted">Submit via course portal</p>
          </div>
          <div class="event-time">May 10, 11:59 PM</div>
        </div>
        <div class="event-item">
          <div>
            <h3 style="margin: 0;">IT-305 Midterm Exam</h3>
            <p class="text-muted">Room 105, Testing Center</p>
          </div>
          <div class="event-time">May 15, 10:00 AM</div>
        </div>
      </div>
    </div>
  `;
}

// === Study Groups ===
function renderGroups() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Study Groups</h1>
        <p class="text-muted">Join or create study groups for your classes</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">Create Group</button>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <div class="launchpad-grid">
        <div class="glass-card" style="padding: 1.5rem; cursor: pointer;">
          <h3>CS-402 Study Group</h3>
          <p class="text-muted" style="margin: 0.5rem 0;">Advanced Web Systems</p>
          <p class="text-muted" style="font-size: 0.85rem;">👥 8 members • Last active: 2 hours ago</p>
          <button class="btn btn-sm btn-ghost mt-1" style="width: 100%;">Join Group</button>
        </div>
        <div class="glass-card" style="padding: 1.5rem; cursor: pointer;">
          <h3>Data Structures Group</h3>
          <p class="text-muted" style="margin: 0.5rem 0;">CS-301 Prep</p>
          <p class="text-muted" style="font-size: 0.85rem;">👥 5 members • Last active: 1 day ago</p>
          <button class="btn btn-sm btn-primary mt-1" style="width: 100%;">Leave Group</button>
        </div>
        <div class="glass-card" style="padding: 1.5rem; cursor: pointer;">
          <h3>Cybersecurity Enthusiasts</h3>
          <p class="text-muted" style="margin: 0.5rem 0;">IT-305 & General Interest</p>
          <p class="text-muted" style="font-size: 0.85rem;">👥 12 members • Last active: 30 mins ago</p>
          <button class="btn btn-sm btn-primary mt-1" style="width: 100%;">Leave Group</button>
        </div>
      </div>
    </div>
  `;
}

// === Directory ===
function renderUsers() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Directory</h1>
        <p class="text-muted">Find and connect with other students and instructors</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <div style="margin-bottom: 2rem;">
        <input type="text" placeholder="Search by name, email, or department..." style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem 1rem; border-radius: 12px; color: var(--text-main); font-size: 0.95rem;">
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            ${campusUsers.map(u => `
              <tr onclick="viewUserProfile('${u.id}')" style="cursor:pointer;">
                <td>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <img src="${u.avatar}" style="width:24px;height:24px;border-radius:50%;">
                    <strong>${u.name}</strong>
                  </div>
                </td>
                <td>${u.email}</td>
                <td>${u.dept}</td>
                <td><span class="badge ${u.role === 'Instructor' ? 'badge-primary' : 'badge-secondary'}">${u.role}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function viewUserProfile(userId) {
  const user = campusUsers.find(u => u.id === userId);
  if (user) alert(`User Profile: ${user.name}\nDepartment: ${user.dept}\nRole: ${user.role}`);
}

// === Profile ===
function renderProfile() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Profile Settings</h1>
        <p class="text-muted">Manage your account and preferences</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>Account Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: 500;">Full Name</label>
          <input type="text" value="${currentUser.name}" style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main);">
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: 500;">Email</label>
          <input type="email" value="${currentUser.email}" style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main);">
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: 500;">Major</label>
          <input type="text" value="${currentUser.major}" style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main);">
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: 500;">GPA</label>
          <input type="text" value="${currentUser.gpa}" style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main);">
        </div>
      </div>
      <button class="btn btn-primary">Save Changes</button>
    </div>

    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>Preferences</h2>
      <div style="margin: 2rem 0;">
        <label style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; cursor: pointer;">
          <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
          <span>Email notifications for new assignments</span>
        </label>
        <label style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; cursor: pointer;">
          <input type="checkbox" checked style="width: 20px; height: 20px; cursor: pointer;">
          <span>Email notifications for messages</span>
        </label>
        <label style="display: flex; align-items: center; gap: 1rem; cursor: pointer;">
          <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
          <span>Dark mode (default)</span>
        </label>
      </div>
    </div>

    <div class="glass-card animate-fade-in" style="margin-top: 2rem; border-color: rgba(239, 68, 68, 0.2);">
      <h2 style="color: #ef4444;">Danger Zone</h2>
      <p class="text-muted" style="margin: 1rem 0;">Once you delete your account, there is no going back. Please be certain.</p>
      <button class="btn" style="background: #ef4444; color: white; padding: 0.75rem 1.5rem; border-radius: 12px; border: none; cursor: pointer;">Delete Account</button>
    </div>
  `;
}



// === Init ===
function init() {
  initNav();
  renderDashboard();
  document.querySelector('[data-page="dashboard"]').classList.add('active');
  console.log('CampusFlow LMS Initialized');
  console.log(`Current User: ${currentUser.name} (${currentUser.role}${currentUser.role === 'student' ? ', Year ' + currentUser.year : ''})`);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
