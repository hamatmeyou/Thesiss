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

const messageData = [
  { id: 1, sender: 'Sarah Jenkins', preview: 'The assignment deadline has been extended...', time: '2 hours ago', messages: ['The assignment deadline has been extended to next Friday.', 'Make sure to review the updated requirements.'] },
  { id: 2, sender: 'James Wilson', preview: 'Don\'t forget about the project review...', time: '4 hours ago', messages: ['Don\'t forget about the project review on Thursday.'] },
  { id: 3, sender: 'Study Group', preview: 'Meet up at the library tomorrow...', time: '1 day ago', messages: ['Meet up at the library tomorrow at 3 PM?'] }
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
  profile: renderProfile,
  thesis: renderThesis
};

let currentPage = 'dashboard';

// === Access Control ===
function canAccessThesis() {
  if (currentUser.role === 'student') {
    // Students: 3rd/4th year OR student assistants
    return currentUser.year >= 3 || currentUser.isStudentAssistant;
  } else if (currentUser.role === 'professor') {
    // Professors: must be adviser or capstone head
    return currentUser.professorRoles.includes('adviser') || currentUser.professorRoles.includes('capstone_head');
  }
  return false;
}

function canAccessPage(page) {
  if (page === 'thesis') {
    return canAccessThesis();
  }
  return true; // Other pages are accessible to all
}

// === Navigation ===
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
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
  
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
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
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Assignments</h1>
        <p class="text-muted">Track your assignments and submissions</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <button class="btn btn-primary btn-sm" style="opacity: 1;">All (${assignmentData.length})</button>
        <button class="btn btn-ghost btn-sm">Pending (2)</button>
        <button class="btn btn-ghost btn-sm">Submitted (1)</button>
      </div>

      ${assignmentData.map((a, i) => `
        <div class="glass-card assignment-card animate-fade-in" style="animation-delay: ${i * 0.1}s; background: rgba(20, 22, 35, 0.4); margin-bottom: 1rem;">
          <div class="assignment-info">
            <h3>${a.title}</h3>
            <p class="text-muted">${a.class}</p>
            <div class="due-date">Due ${a.dueDate}</div>
          </div>
          <button class="btn btn-primary btn-sm">${a.submitted ? 'Submitted' : 'Submit'}</button>
        </div>
      `).join('')}
    </div>
  `;
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
            <tr>
              <td><strong>Sarah Jenkins</strong></td>
              <td>s.jenkins@university.edu</td>
              <td>Computer Science</td>
              <td>Instructor</td>
            </tr>
            <tr>
              <td><strong>James Wilson</strong></td>
              <td>j.wilson@university.edu</td>
              <td>Computer Science</td>
              <td>Instructor</td>
            </tr>
            <tr>
              <td><strong>Elena Rodriguez</strong></td>
              <td>e.rodriguez@university.edu</td>
              <td>Information Technology</td>
              <td>Instructor</td>
            </tr>
            <tr>
              <td><strong>Michael Torres</strong></td>
              <td>m.torres@university.edu</td>
              <td>Computer Science</td>
              <td>Student</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
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

// === Thesis ===
function renderThesis() {
  const isStudent = currentUser.role === 'student';
  const isProfessor = currentUser.role === 'professor';
  
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>📚 Thesis Management</h1>
        <p class="text-muted">${isStudent ? 'View and manage your thesis project' : 'Manage thesis projects as adviser or capstone head'}</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">${isStudent ? 'Submit Thesis' : 'Review Submissions'}</button>
      </div>
    </div>

    ${isStudent ? `
      <div class="glass-card animate-fade-in">
        <h2>Your Thesis Project</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
          <div>
            <h3>Project Title</h3>
            <input type="text" placeholder="Enter thesis title..." style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main); margin-top: 0.5rem;">
          </div>
          <div>
            <h3>Status</h3>
            <select style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main); margin-top: 0.5rem;">
              <option selected>In Progress</option>
              <option>Planning</option>
              <option>Implementation</option>
              <option>Testing</option>
              <option>Documentation</option>
              <option>Ready for Review</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <div style="margin-bottom: 2rem;">
          <h3>Description</h3>
          <textarea placeholder="Describe your thesis project, objectives, and progress..." style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main); height: 120px; margin-top: 0.5rem; font-family: var(--font-body);"></textarea>
        </div>
        <button class="btn btn-primary">Save Progress</button>
      </div>

      <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
        <h2>Adviser Information</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Adviser Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Dr. Sarah Jenkins</strong></td>
                <td>s.jenkins@university.edu</td>
                <td>Computer Science</td>
                <td><button class="btn btn-sm btn-ghost">Message</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
        <h2>Thesis Submissions</h2>
        <div style="margin: 1.5rem 0;">
          <div style="padding: 1rem; background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--primary); border-radius: 8px; margin-bottom: 1rem;">
            <h3 style="margin: 0 0 0.5rem 0;">Proposal Document</h3>
            <p class="text-muted" style="margin: 0; font-size: 0.9rem;">Submitted on May 1, 2026 • Approved by Dr. Jenkins</p>
          </div>
          <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--secondary); border-radius: 8px; margin-bottom: 1rem;">
            <h3 style="margin: 0 0 0.5rem 0;">Progress Report 1</h3>
            <p class="text-muted" style="margin: 0; font-size: 0.9rem;">Submitted on May 15, 2026 • Pending Review</p>
          </div>
          <button class="btn btn-primary btn-sm">Upload New Document</button>
        </div>
      </div>
    ` : `
      <div class="glass-card animate-fade-in">
        <h2>Your Role</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
          ${currentUser.professorRoles.includes('adviser') ? `
            <div style="padding: 1rem; background: rgba(139, 92, 246, 0.1); border: 1px solid var(--primary); border-radius: 12px;">
              <h3 style="margin-top: 0;">👨‍🏫 Thesis Adviser</h3>
              <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.9rem;">Advising student thesis projects</p>
            </div>
          ` : ''}
          ${currentUser.professorRoles.includes('capstone_head') ? `
            <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--secondary); border-radius: 12px;">
              <h3 style="margin-top: 0;">🎓 Capstone Head</h3>
              <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.9rem;">Overseeing capstone program</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
        <h2>Students Under Your Supervision</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Year</th>
                <th>Thesis Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Alex Morgan</strong></td>
                <td>3rd Year</td>
                <td>AI-Based Learning System</td>
                <td><span style="color: var(--secondary); font-weight: 600;">In Progress</span></td>
                <td><button class="btn btn-sm btn-primary">Review</button></td>
              </tr>
              <tr>
                <td><strong>Jordan Smith</strong></td>
                <td>4th Year</td>
                <td>Cloud Security Analysis</td>
                <td><span style="color: var(--primary); font-weight: 600;">Ready for Review</span></td>
                <td><button class="btn btn-sm btn-primary">Review</button></td>
              </tr>
              <tr>
                <td><strong>Casey Brown</strong></td>
                <td>3rd Year</td>
                <td>Mobile App Development</td>
                <td><span style="color: #eab308; font-weight: 600;">Pending Submission</span></td>
                <td><button class="btn btn-sm btn-ghost">Contact</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `}
  `;
}

// === Init ===
function init() {
  initNav();
  
  // Control thesis menu visibility based on permissions
  const thesisMenuItem = document.querySelector('[data-page="thesis"]');
  if (canAccessThesis()) {
    thesisMenuItem.style.display = 'flex';
  } else {
    thesisMenuItem.style.display = 'none';
  }
  
  renderDashboard();
  document.querySelector('[data-page="dashboard"]').classList.add('active');
  console.log('CampusFlow LMS Initialized');
  console.log(`Current User: ${currentUser.name} (${currentUser.role}${currentUser.role === 'student' ? ', Year ' + currentUser.year : ''})`);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
