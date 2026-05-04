// === Authentication & Users ===
const testUsers = {
  // Admin
  'admin': {
    id: 'admin1',
    password: 'password123',
    name: 'Administrator',
    email: 'admin@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: 'admin',
    permissions: ['view_all_users', 'manage_accounts', 'system_settings', 'reports']
  },
  // Principal
  'principal': {
    id: 'principal1',
    password: 'password123',
    name: 'Dr. Michael Henderson',
    email: 'principal@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'principal',
    department: 'Administration',
    permissions: ['view_all_records', 'approve_requests', 'manage_staff']
  },
  // Academic Heads
  'academic_head': {
    id: 'academic1',
    password: 'password123',
    name: 'Dr. Patricia Williams',
    email: 'p.williams@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    role: 'academic_head',
    department: 'Computer Science',
    permissions: ['manage_courses', 'view_department_records', 'approve_grades']
  },
  // Course Head
  'course_head': {
    id: 'course1',
    password: 'password123',
    name: 'Dr. Robert Chen',
    email: 'r.chen@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'course_head',
    department: 'Computer Science',
    assignedCourse: 'CS-402',
    permissions: ['manage_course', 'grade_students', 'manage_materials']
  },
  // Counselor
  'counselor': {
    id: 'counselor1',
    password: 'password123',
    name: 'Ms. Jennifer Davis',
    email: 'j.davis@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    role: 'counselor',
    department: 'Student Services',
    permissions: ['view_student_records', 'schedule_meetings', 'view_grades']
  },
  // Student Assistant
  'student_ass': {
    id: 'stass1',
    password: 'password123',
    name: 'Alex Morgan',
    email: 'alex.morgan@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    gpa: '3.85',
    major: 'Computer Science',
    role: 'student_assistant',
    year: 3,
    assistantRole: 'tutor',
    permissions: ['help_students', 'create_study_groups', 'view_course_materials']
  },
  // Regular Students
  'student1': {
    id: 'student1',
    password: 'password123',
    name: 'Michael Torres',
    email: 'm.torres@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    gpa: '3.72',
    major: 'Computer Science',
    role: 'student',
    year: 4,
    permissions: ['view_grades', 'submit_assignments', 'view_messages']
  },
  'student2': {
    id: 'student2',
    password: 'password123',
    name: 'Jordan Smith',
    email: 'jordan.smith@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    gpa: '3.95',
    major: 'Computer Science',
    role: 'student',
    year: 4,
    permissions: ['view_grades', 'submit_assignments', 'view_messages']
  },
  'student3': {
    id: 'student3',
    password: 'password123',
    name: 'Casey Brown',
    email: 'casey.brown@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
    gpa: '3.45',
    major: 'Information Technology',
    role: 'student',
    year: 2,
    permissions: ['view_grades', 'submit_assignments', 'view_messages']
  },
  // Professors (kept for compatibility)
  'sarah': {
    id: 'sarah1',
    password: 'password123',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    major: 'Computer Science',
    role: 'professor',
    year: null,
    isStudentAssistant: false,
    professorRoles: ['adviser'],
    permissions: ['teach_course', 'grade_students', 'view_student_records']
  },
  'james': {
    id: 'james1',
    password: 'password123',
    name: 'Dr. James Wilson',
    email: 'j.wilson@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    major: 'Computer Science',
    role: 'professor',
    year: null,
    isStudentAssistant: false,
    professorRoles: ['capstone_head'],
    permissions: ['teach_course', 'grade_students', 'view_student_records']
  },
  'elena': {
    id: 'elena1',
    password: 'password123',
    name: 'Prof. Elena Rodriguez',
    email: 'e.rodriguez@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    major: 'Information Technology',
    role: 'professor',
    year: null,
    isStudentAssistant: false,
    professorRoles: ['adviser', 'capstone_head'],
    permissions: ['teach_course', 'grade_students', 'view_student_records']
  }
};

let currentUser = null;
let isLoggedIn = false;

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

// === Authentication Functions ===
function showLoginPage() {
  document.body.innerHTML = `
    <div class="mesh-bg"></div>
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem;">
      <div class="glass-card" style="width: 100%; max-width: 450px;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; margin: 0.5rem 0;">🚀 CampusFlow</h1>
          <p class="text-muted">Modern Learning Management System</p>
        </div>
        
        <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Username</label>
            <input type="text" id="login-username" placeholder="Enter username" required 
              style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main); font-size: 1rem;">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password</label>
            <input type="password" id="login-password" placeholder="Enter password" required 
              style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 12px; color: var(--text-main); font-size: 1rem;">
          </div>
          
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="remember-me" style="width: 18px; height: 18px; cursor: pointer;">
            <span>Remember me</span>
          </label>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem;">
            Sign In
          </button>
        </form>
        
        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
          <p class="text-muted" style="text-align: center; margin-bottom: 1rem; font-size: 0.9rem;">Quick Login - Test Accounts</p>
          
          <div style="margin-bottom: 1rem;">
            <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.8rem; font-weight: 500;">Administration</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-ghost" onclick="quickLogin('admin')" style="font-size: 0.8rem; padding: 0.4rem;">👑 Admin</button>
              <button type="button" class="btn btn-ghost" onclick="quickLogin('principal')" style="font-size: 0.8rem; padding: 0.4rem;">🎓 Principal</button>
            </div>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.8rem; font-weight: 500;">Academic</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-ghost" onclick="quickLogin('academic_head')" style="font-size: 0.8rem; padding: 0.4rem;">📚 Acad Head</button>
              <button type="button" class="btn btn-ghost" onclick="quickLogin('course_head')" style="font-size: 0.8rem; padding: 0.4rem;">📖 Course Head</button>
            </div>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.8rem; font-weight: 500;">Faculty & Support</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-ghost" onclick="quickLogin('sarah')" style="font-size: 0.8rem; padding: 0.4rem;">👨‍🏫 Professor</button>
              <button type="button" class="btn btn-ghost" onclick="quickLogin('counselor')" style="font-size: 0.8rem; padding: 0.4rem;">💼 Counselor</button>
            </div>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.8rem; font-weight: 500;">Students</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-ghost" onclick="quickLogin('student_ass')" style="font-size: 0.8rem; padding: 0.4rem;">🎯 Stud. Ass.</button>
              <button type="button" class="btn btn-ghost" onclick="quickLogin('student1')" style="font-size: 0.8rem; padding: 0.4rem;">👨‍🎓 Student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

function quickLogin(username) {
  document.getElementById('login-username').value = username;
  document.getElementById('login-password').value = testUsers[username].password;
  document.getElementById('login-form').dispatchEvent(new Event('submit'));
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.toLowerCase();
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  
  if (testUsers[username] && testUsers[username].password === password) {
    currentUser = { ...testUsers[username] };
    isLoggedIn = true;
    
    if (rememberMe) {
      localStorage.setItem('campusflow_user', JSON.stringify(currentUser));
      localStorage.setItem('campusflow_remembered', 'true');
    }
    
    init();
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('campusflow_user');
    localStorage.removeItem('campusflow_remembered');
    showLoginPage();
  }
}

function checkSavedLogin() {
  const saved = localStorage.getItem('campusflow_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      isLoggedIn = true;
      return true;
    } catch (e) {
      localStorage.removeItem('campusflow_user');
      return false;
    }
  }
  return false;
}

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

// === Access Control & Permissions ===
function hasPermission(permission) {
  if (!currentUser || !currentUser.permissions) return false;
  return currentUser.permissions.includes(permission);
}

function canAccessPage(page) {
  return true; // All pages are accessible to all users
}

function getRoleDisplay() {
  const roles = {
    'admin': '👑 Administrator',
    'principal': '🎓 Principal',
    'academic_head': '📚 Academic Head',
    'course_head': '📖 Course Head',
    'professor': '👨‍🏫 Professor',
    'counselor': '💼 Counselor',
    'student_assistant': '🎯 Student Assistant',
    'student': '👨‍🎓 Student'
  };
  return roles[currentUser.role] || currentUser.role;
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
  let dashboardContent = '';
  
  if (currentUser.role === 'admin') {
    dashboardContent = renderAdminDashboard();
  } else if (currentUser.role === 'principal') {
    dashboardContent = renderPrincipalDashboard();
  } else if (currentUser.role === 'academic_head') {
    dashboardContent = renderAcademicHeadDashboard();
  } else if (currentUser.role === 'course_head') {
    dashboardContent = renderCourseHeadDashboard();
  } else if (currentUser.role === 'professor') {
    dashboardContent = renderProfessorDashboard();
  } else if (currentUser.role === 'counselor') {
    dashboardContent = renderCounselorDashboard();
  } else if (currentUser.role === 'student_assistant') {
    dashboardContent = renderStudentAssistantDashboard();
  } else {
    dashboardContent = renderStudentDashboard();
  }
  
  document.getElementById('page-content').innerHTML = dashboardContent;
}

// Admin Dashboard
function renderAdminDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Administrator</span>.</h1>
        <p class="text-muted">System Administration & Management Dashboard</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">System Report</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>1,234</h3>
          <p>Total Users</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-content">
          <h3>45</h3>
          <p>Active Departments</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>98.5%</h3>
          <p>System Uptime</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>2</h3>
          <p>System Alerts</p>
        </div>
      </div>`;
}

// Principal Dashboard
function renderPrincipalDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Principal</span>.</h1>
        <p class="text-muted">Institutional Overview & Leadership Dashboard</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">View Reports</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>3,450</h3>
          <p>Total Students</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🏫</div>
        <div class="stat-content">
          <h3>245</h3>
          <p>Faculty Members</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>120</h3>
          <p>Active Courses</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h3>3.42</h3>
          <p>Avg GPA</p>
        </div>
      </div>`;
}

// Academic Head Dashboard
function renderAcademicHeadDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Academic Head</span>.</h1>
        <p class="text-muted">Department Management & Academic Oversight</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">Manage Courses</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>12</h3>
          <p>Department Courses</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🏫</div>
        <div class="stat-content">
          <h3>18</h3>
          <p>Faculty Members</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>450</h3>
          <p>Students</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <h3>8</h3>
          <p>Pending Reviews</p>
        </div>
      </div>`;
}

// Course Head Dashboard
function renderCourseHeadDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Course Head</span>.</h1>
        <p class="text-muted">Course Management & Student Instruction</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">Create Assignment</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">📖</div>
        <div class="stat-content">
          <h3>1</h3>
          <p>Assigned Course</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>45</h3>
          <p>Enrolled Students</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✏️</div>
        <div class="stat-content">
          <h3>6</h3>
          <p>Active Assignments</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <h3>23</h3>
          <p>Submissions to Grade</p>
        </div>
      </div>`;
}

// Professor Dashboard
function renderProfessorDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Prof. ${currentUser.name.split(' ')[1]}</span>.</h1>
        <p class="text-muted">Course Instruction & Student Assessment</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="navigateTo('classes')">My Classes</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>3</h3>
          <p>Teaching Courses</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>125</h3>
          <p>Total Students</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <h3>15</h3>
          <p>To Grade</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-content">
          <h3>7</h3>
          <p>Unread Messages</p>
        </div>
      </div>`;
}

// Counselor Dashboard
function renderCounselorDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Counselor</span>.</h1>
        <p class="text-muted">Student Support & Guidance</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">Schedule Meeting</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>42</h3>
          <p>Advising Students</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-content">
          <h3>5</h3>
          <p>Meetings Today</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>3</h3>
          <p>At-Risk Students</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>3.51</h3>
          <p>Avg GPA</p>
        </div>
      </div>`;
}

// Student Assistant Dashboard
function renderStudentAssistantDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--secondary);">Alex</span>.</h1>
        <p class="text-muted">Student Assistant Dashboard - Peer Support Role</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="navigateTo('groups')">My Study Groups</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>3</h3>
          <p>Study Groups</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍🎓</div>
        <div class="stat-content">
          <h3>28</h3>
          <p>Students Helped</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>4</h3>
          <p>Active Classes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h3>3.85</h3>
          <p>Current GPA</p>
        </div>
      </div>`;
}

// Student Dashboard
function renderStudentDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome back, <span style="color: var(--secondary);">` + currentUser.name.split(' ')[0] + `</span>.</h1>
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
          <h3>` + (currentUser.gpa || '3.85') + `</h3>
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
  let profileContent = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Profile Settings</h1>
        <p class="text-muted">Manage your account and preferences</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>Account Information</h2>
      <div style="display: flex; gap: 2rem; margin: 2rem 0; align-items: center;">
        <img src="${currentUser.avatar}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%;">
        <div>
          <p style="margin: 0.5rem 0;"><strong>Name:</strong> ${currentUser.name}</p>
          <p style="margin: 0.5rem 0;"><strong>Email:</strong> ${currentUser.email}</p>
          <p style="margin: 0.5rem 0;"><strong>Role:</strong> ${getRoleDisplay()}</p>
          <p style="margin: 0.5rem 0;"><strong>User ID:</strong> ${currentUser.id}</p>
        </div>
      </div>
    </div>`;

  // Role-specific info
  if (currentUser.department) {
    profileContent += `
    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>Organization Information</h2>
      <div style="margin: 2rem 0;">
        <p><strong>Department:</strong> ${currentUser.department}</p>`;
    if (currentUser.assignedCourse) {
      profileContent += `<p><strong>Course:</strong> ${currentUser.assignedCourse}</p>`;
    }
    profileContent += `</div></div>`;
  }

  if (currentUser.gpa) {
    profileContent += `
    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>Academic Information</h2>
      <div style="margin: 2rem 0;">
        <p><strong>GPA:</strong> ${currentUser.gpa}</p>`;
    if (currentUser.major) {
      profileContent += `<p><strong>Major:</strong> ${currentUser.major}</p>`;
    }
    if (currentUser.year) {
      profileContent += `<p><strong>Year:</strong> Year ${currentUser.year}</p>`;
    }
    profileContent += `</div></div>`;
  }

  profileContent += `
    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>Permissions</h2>
      <div style="margin: 2rem 0; display: flex; flex-wrap: wrap; gap: 1rem;">`;
  
  currentUser.permissions.forEach(perm => {
    profileContent += `<span style="background: rgba(139, 92, 246, 0.2); border: 1px solid var(--primary); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.9rem;">${perm.replace(/_/g, ' ')}</span>`;
  });

  profileContent += `
      </div>
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
  `;

  document.getElementById('page-content').innerHTML = profileContent;
}


// === Init ===
function init() {
  // Render the full page
  document.body.innerHTML = `
    <div class="mesh-bg"></div>

    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <div class="nav-left">
        <div class="brand">🚀 <span>CampusFlow</span></div>
      </div>
      <div class="nav-right">
        <div class="search-box">
          <input type="text" placeholder="Search classes, assignments...">
          <span>🔍</span>
        </div>
        <div class="user-menu">
          <img src="${currentUser.avatar}" alt="User Avatar" class="user-avatar" id="user-avatar" style="cursor: pointer;">
          <div class="notification-bell">🔔</div>
          <div id="account-menu" class="account-dropdown" style="display: none; position: absolute; top: 70px; right: 20px; background: rgba(10, 10, 25, 0.95); border: 1px solid var(--glass-border); border-radius: 12px; padding: 0.5rem; min-width: 220px; z-index: 999; backdrop-filter: blur(12px);">
            <div style="padding: 1rem; border-bottom: 1px solid var(--glass-border); margin-bottom: 0.5rem;">
              <p style="margin: 0 0 0.25rem 0; font-weight: 600;">${currentUser.name}</p>
              <p class="text-muted" style="margin: 0; font-size: 0.85rem;">${currentUser.email}</p>
              <p class="text-muted" style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">Role: <strong>${currentUser.role === 'student' ? 'Student' : 'Professor'}</strong></p>
            </div>
            <button onclick="navigateTo('profile')" style="width: 100%; text-align: left; padding: 0.75rem; background: none; border: none; color: var(--text-main); cursor: pointer; border-radius: 8px; transition: background 0.2s;">
              👤 View Profile
            </button>
            <button onclick="logout()" style="width: 100%; text-align: left; padding: 0.75rem; background: none; border: none; color: #ef4444; cursor: pointer; border-radius: 8px; transition: background 0.2s;">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-item active" data-page="dashboard">
            <span class="nav-icon">📊</span>
            <span class="nav-label">Dashboard</span>
          </div>
          <div class="nav-item" data-page="classes">
            <span class="nav-icon">📚</span>
            <span class="nav-label">My Classes</span>
          </div>
          <div class="nav-item" data-page="assignments">
            <span class="nav-icon">✏️</span>
            <span class="nav-label">Assignments</span>
          </div>
          <div class="nav-item" data-page="grades">
            <span class="nav-icon">📈</span>
            <span class="nav-label">Grades</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-item" data-page="messages">
            <span class="nav-icon">💬</span>
            <span class="nav-label">Messages</span>
            <span class="badge">3</span>
          </div>
          <div class="nav-item" data-page="schedule">
            <span class="nav-icon">📅</span>
            <span class="nav-label">Schedule</span>
          </div>
          <div class="nav-item" data-page="groups">
            <span class="nav-icon">👥</span>
            <span class="nav-label">Study Groups</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-item" data-page="users">
            <span class="nav-icon">👤</span>
            <span class="nav-label">Directory</span>
          </div>
          <div class="nav-item" data-page="profile">
            <span class="nav-icon">⚙️</span>
            <span class="nav-label">Profile</span>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <div id="page-content"></div>
    </main>

    <!-- Modals -->
    <div id="modal-overlay" class="hidden" style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center;">
      <div class="glass-card" style="width: 100%; max-width: 400px; position: relative;">
        <button onclick="document.getElementById('modal-overlay').classList.add('hidden')" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: white; cursor: pointer; font-size: 1.25rem;">✕</button>
        <div id="modal-content"></div>
      </div>
    </div>
  `;

  initNav();
  renderDashboard();
  document.querySelector('[data-page="dashboard"]').classList.add('active');

  // Setup user menu toggle
  document.getElementById('user-avatar').addEventListener('click', () => {
    const menu = document.getElementById('account-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      const menu = document.getElementById('account-menu');
      if (menu) menu.style.display = 'none';
    }
  });

  console.log('CampusFlow LMS Initialized');
  console.log(`Logged in as: ${currentUser.name} (${currentUser.role})`);
}

// === Page Load ===
window.addEventListener('DOMContentLoaded', () => {
  if (checkSavedLogin()) {
    init();
  } else {
    showLoginPage();
  }
});
