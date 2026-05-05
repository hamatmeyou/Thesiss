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
  // Academic Admin
  'academic_admin': {
    id: 'academic1',
    password: 'password123',
    name: 'Dr. Patricia Williams',
    email: 'p.williams@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    role: 'academic_admin',
    department: 'Computer Science',
    permissions: ['manage_courses', 'view_department_records', 'approve_grades']
  },
  // Program Coordinator
  'program_coordinator': {
    id: 'course1',
    password: 'password123',
    name: 'Dr. Robert Chen',
    email: 'r.chen@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'program_coordinator',
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
  // Instructors
  'sarah': {
    id: 'sarah1',
    password: 'password123',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    major: 'Computer Science',
    role: 'instructor',
    year: null,
    isStudentAssistant: false,
    instructorRoles: ['adviser'],
    permissions: ['teach_course', 'grade_students', 'view_student_records']
  },
  'james': {
    id: 'james1',
    password: 'password123',
    name: 'Dr. James Wilson',
    email: 'j.wilson@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    major: 'Computer Science',
    role: 'instructor',
    year: null,
    isStudentAssistant: false,
    instructorRoles: ['capstone_head'],
    permissions: ['teach_course', 'grade_students', 'view_student_records']
  },
  'elena': {
    id: 'elena1',
    password: 'password123',
    name: 'Elena Rodriguez',
    email: 'e.rodriguez@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    major: 'Information Technology',
    role: 'instructor',
    year: null,
    isStudentAssistant: false,
    instructorRoles: ['adviser', 'capstone_head'],
    permissions: ['teach_course', 'grade_students', 'view_student_records']
  }
};

let currentUser = null;
let isLoggedIn = false;

// === Data ===
const classData = [
  { id: 1, title: 'Advanced Web Systems', code: 'CS-402', teacher: 'Instructor Sarah Jenkins', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Artificial Intelligence', code: 'CS-301', teacher: 'Instructor James Wilson', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Cybersecurity Fundamentals', code: 'IT-305', teacher: 'Instructor Elena Rodriguez', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Cloud Infrastructure', code: 'IT-408', teacher: 'Dr. Michael Chen', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=600' }
];

const assignmentSubmissions = [
  {
    id: 1,
    title: 'Design Database Schema',
    courseId: 'CS-402',
    courseName: 'Advanced Web Systems',
    assignmentType: 'Project',
    module: 'Week 2',
    dueDate: '2026-05-10',
    status: 'pending',
    submitted: false,
    score: null,
    maxScore: 100,
    remarks: '',
    versionHistory: [
      { version: 1, date: '2026-05-01', note: 'Initial outline uploaded' }
    ]
  },
  {
    id: 2,
    title: 'Neural Network Implementation',
    courseId: 'CS-301',
    courseName: 'Artificial Intelligence',
    assignmentType: 'Project',
    module: 'Week 3',
    dueDate: '2026-05-12',
    status: 'pending',
    submitted: false,
    score: null,
    maxScore: 100,
    remarks: '',
    versionHistory: [
      { version: 1, date: '2026-05-03', note: 'Initial code stub uploaded' }
    ]
  },
  {
    id: 3,
    title: 'Security Protocol Analysis',
    courseId: 'IT-305',
    courseName: 'Cybersecurity Fundamentals',
    assignmentType: 'Essay',
    module: 'Week 4',
    dueDate: '2026-05-15',
    status: 'submitted',
    submitted: true,
    score: 92,
    maxScore: 100,
    remarks: 'Strong analysis, minor formatting notes',
    versionHistory: [
      { version: 1, date: '2026-05-05', note: 'Draft uploaded' },
      { version: 2, date: '2026-05-08', note: 'Revised with faculty feedback' }
    ]
  }
];

let currentAssignmentFilter = 'all';

const messageData = [
  { id: 1, sender: 'Sarah Jenkins', preview: 'The assignment deadline has been extended...', time: '2 hours ago', messages: ['The assignment deadline has been extended to next Friday.', 'Make sure to review the updated requirements.'] },
  { id: 2, sender: 'James Wilson', preview: 'Don\'t forget about the project review...', time: '4 hours ago', messages: ['Don\'t forget about the project review on Thursday.'] },
  { id: 3, sender: 'Study Group', preview: 'Meet up at the library tomorrow...', time: '1 day ago', messages: ['Meet up at the library tomorrow at 3 PM?'] }
];

const supportTickets = [
  {
    id: 1,
    requester: 'Michael Torres',
    courseId: 'CS-402',
    title: 'Unable to upload assignment file',
    status: 'Open',
    priority: 'High',
    submittedOn: '2026-05-02',
    updates: ['The upload button returns an error after selecting a file.', 'Requesting confirmation that version history is saved.']
  },
  {
    id: 2,
    requester: 'Jordan Smith',
    courseId: 'CS-301',
    title: 'Clarification on grading rubric',
    status: 'Answered',
    priority: 'Medium',
    submittedOn: '2026-05-01',
    updates: ['Can you clarify the expectations for deliverable 2?', 'Instructor responded with grading criteria.']
  }
];

const courseSchedule = [
  { id: 1, courseId: 'CS-402', title: 'Week 1: Introduction', date: 'May 4, 2026', type: 'Module', description: 'Course overview and syllabus review.' },
  { id: 2, courseId: 'CS-402', title: 'Assignment 1 Due', date: 'May 10, 2026', type: 'Deadline', description: 'Design Database Schema submission deadline.' },
  { id: 3, courseId: 'CS-301', title: 'Week 3: Neural Networks', date: 'May 7, 2026', type: 'Module', description: 'Hands-on neural network workshop.' },
  { id: 4, courseId: 'IT-305', title: 'Midterm Exam', date: 'May 14, 2026', type: 'Exam', description: 'Security protocols midterm assessment.' }
];

const campusUsers = [
  { id: 'p1', name: 'Sarah Jenkins', email: 's.jenkins@university.edu', dept: 'Computer Science', role: 'Instructor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'p2', name: 'James Wilson', email: 'j.wilson@university.edu', dept: 'Computer Science', role: 'Instructor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'p3', name: 'Elena Rodriguez', email: 'e.rodriguez@university.edu', dept: 'Information Technology', role: 'Instructor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 's1', name: 'Michael Torres', email: 'm.torres@university.edu', dept: 'Computer Science', role: 'Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' }
];

const modules = [
  { id: 'mod-cs402-01', courseId: 'CS-402', title: 'Week 1: Introduction & Setup', description: 'Course overview, syllabus, and development environment setup.', order: 1, startDate: '2026-05-04', endDate: '2026-05-11', isOpen: true },
  { id: 'mod-cs402-02', courseId: 'CS-402', title: 'Week 2: Database Design', description: 'Fundamentals of relational databases and normalization.', order: 2, startDate: '2026-05-12', endDate: '2026-05-19', isOpen: true },
  { id: 'mod-cs301-01', courseId: 'CS-301', title: 'Week 1: Neural Networks Basics', description: 'Introduction to neural networks and deep learning.', order: 1, startDate: '2026-05-04', endDate: '2026-05-11', isOpen: true },
  { id: 'mod-cs301-02', courseId: 'CS-301', title: 'Week 2: Convolutional Networks', description: 'CNNs and image processing techniques.', order: 2, startDate: '2026-05-12', endDate: '2026-05-19', isOpen: true }
];

const lessons = [
  { id: 'lesson-01', moduleId: 'mod-cs402-01', title: 'Course Introduction Video', type: 'video', content: 'Learn the course objectives and structure.', order: 1 },
  { id: 'lesson-02', moduleId: 'mod-cs402-01', title: 'Installing Node.js and npm', type: 'guide', content: 'Step-by-step guide to setting up your development environment.', order: 2 },
  { id: 'lesson-03', moduleId: 'mod-cs402-02', title: 'Database Normalization Tutorial', type: 'pdf', fileURL: 'https://storage.university.edu/materials/db-normalization.pdf', order: 1 },
  { id: 'lesson-04', moduleId: 'mod-cs402-02', title: 'SQL Queries Workshop', type: 'video', content: 'Hands-on SQL query writing exercises.', order: 2 },
  { id: 'lesson-05', moduleId: 'mod-cs301-01', title: 'Neural Networks Overview', type: 'video', content: 'Introduction to neural network architecture.', order: 1 },
  { id: 'lesson-06', moduleId: 'mod-cs301-02', title: 'CNN Architecture Explained', type: 'guide', content: 'Deep dive into convolutional neural networks.', order: 1 }
];

const enrollments = [
  { id: 'enroll-1', courseId: 'CS-402', userId: 'student1', role: 'student', status: 'active', enrolledAt: '2026-01-20' },
  { id: 'enroll-2', courseId: 'CS-301', userId: 'student1', role: 'student', status: 'active', enrolledAt: '2026-01-20' },
  { id: 'enroll-3', courseId: 'IT-305', userId: 'student1', role: 'student', status: 'active', enrolledAt: '2026-01-20' },
  { id: 'enroll-4', courseId: 'CS-402', userId: 'student2', role: 'student', status: 'active', enrolledAt: '2026-01-21' },
  { id: 'enroll-5', courseId: 'CS-402', userId: 'sarah1', role: 'instructor', status: 'active', enrolledAt: '2026-01-10' }
];

const gradingQueue = [
  { id: 'grade-1', assignmentId: 'assign-cs402-01', assignmentTitle: 'Design Database Schema', studentName: 'Jordan Smith', studentId: 'student2', submittedAt: '2026-05-08T14:20:00Z', version: 1, status: 'pending_grade' },
  { id: 'grade-2', assignmentId: 'assign-cs402-01', assignmentTitle: 'Design Database Schema', studentName: 'Casey Brown', studentId: 'student3', submittedAt: '2026-05-09T10:15:00Z', version: 1, status: 'pending_grade' },
  { id: 'grade-3', assignmentId: 'assign-cs301-01', assignmentTitle: 'Neural Network Implementation', studentName: 'Alex Morgan', studentId: 'student_ass', submittedAt: '2026-05-09T16:45:00Z', version: 2, status: 'pending_grade' }
];

let currentModuleFilter = 'all';
let currentConcernFilter = 'all';

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
              <button type="button" class="btn btn-ghost" onclick="quickLogin('academic_admin')" style="font-size: 0.8rem; padding: 0.4rem;">📚 Acad Admin</button>
              <button type="button" class="btn btn-ghost" onclick="quickLogin('program_coordinator')" style="font-size: 0.8rem; padding: 0.4rem;">📖 Program Coordinator</button>
            </div>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <p class="text-muted" style="margin: 0.5rem 0; font-size: 0.8rem; font-weight: 500;">Faculty & Support</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-ghost" onclick="quickLogin('sarah')" style="font-size: 0.8rem; padding: 0.4rem;">👨‍🏫 Instructor</button>
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
  course: renderCourseDetail,
  modules: renderModulesPage,
  lessons: renderLessonsPage,
  assignments: renderAssignments,
  grades: renderGrades,
  messages: renderMessages,
  schedule: renderSchedule,
  groups: renderGroups,
  users: renderUsers,
  grading: renderGradingQueue,
  concerns: renderConcernsPage,
  admin: renderAdminPanel,
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
    'academic_admin': '📚 Academic Admin',
    'program_coordinator': '📖 Program Coordinator',
    'instructor': '👨‍🏫 Instructor',
    'counselor': '💼 Counselor',
    'student_assistant': '🎯 Student Assistant',
    'student': '👨‍🎓 Student'
  };
  return roles[currentUser.role] || currentUser.role;
}

// === Data ===
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

/* =========================
   Role-based sidebar + right panel
   ========================= */

function formatDateOnly(isoLike) {
  try {
    return new Date(isoLike).toLocaleDateString();
  } catch {
    return isoLike;
  }
}

function getCountdownParts(targetDate) {
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  const clamped = Math.max(0, diffMs);

  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, diffMs };
}

function startCountdownTimer(targetDate, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const tick = () => {
    const parts = getCountdownParts(targetDate);
    if (parts.diffMs <= 0) {
      el.textContent = 'Due now';
      return;
    }
    const d = parts.days > 0 ? `${parts.days}d ` : '';
    el.textContent = `${d}${String(parts.hours).padStart(2, '0')}:${String(parts.minutes).padStart(2, '0')}:${String(parts.seconds).padStart(2, '0')}`;
  };

  tick();
  setInterval(tick, 1000);
}

function iconForNavKey(key) {
  const icons = {
    dashboard: '📊',
    classes: '📚',
    courses: '📚',
    assignments: '✏️',
    grades: '📈',
    messages: '💬',
    schedule: '📅',
    users: '👤',
    modules: '📖',
    concerns: '💭',
    grading: '📝',
    timeline: '🗓️',
    performance: '🏅',
    issues: '⚠️'
  };
  return icons[key] || '•';
}

function navItem(page, label, { badgeText } = {}) {
  const badgeHtml = badgeText ? `<span class="badge">${badgeText}</span>` : '';
  return `
    <div class="nav-item" data-page="${page}">
      <span class="nav-icon">${iconForNavKey(page)}</span>
      <span class="nav-label">${label}</span>
      ${badgeHtml}
    </div>
  `;
}

/**
 * Generates the LEFT sidebar navigation items per role.
 * Returns innerHTML for <aside class="sidebar">.
 */
function generateRoleSidebar(role) {
  // Always include Dashboard + Profile (user can navigate away but shell stays consistent)
  const commonTop = [
    navItem('dashboard', 'Dashboard')
  ];

  const commonBottom = [
    navItem('users', 'Directory'),
    navItem('profile', 'Profile')
  ];

  const roleNav = (() => {
    switch (role) {
      case 'admin':
        return [
          navItem('users', 'Users'),
          navItem('modules', 'Courses'),
          navItem('schedule', 'Timeline'),
          navItem('concerns', 'Critical Issues'),
          navItem('admin', 'System Admin')
        ];
      case 'principal':
        return [
          navItem('grades', 'Academic Performance'),
          navItem('assignments', 'Submission Rates'),
          navItem('concerns', 'Critical Issues'),
          navItem('schedule', 'Key Dates')
        ];
      case 'academic_admin':
        return [
          navItem('modules', 'Courses Needing Attention'),
          navItem('schedule', 'Deadlines'),
          navItem('assignments', 'Submission Progress'),
          navItem('concerns', 'Flagged Concerns')
        ];
      case 'program_coordinator':
        return [
          navItem('classes', 'Program Progress'),
          navItem('schedule', 'Scheduled Activities'),
          navItem('assignments', 'At-Risk Students'),
          navItem('modules', 'Student Trends')
        ];
      case 'instructor':
        return [
          navItem('grading', 'Pending Submissions to Grade'),
          navItem('assignments', 'Deadlines'),
          navItem('classes', 'Recent Submissions'),
          navItem('grades', 'Class Performance')
        ];
      case 'counselor':
        return [
          navItem('concerns', 'New Concerns', { badgeText: '1' }),
          navItem('messages', 'High-Priority Issues'),
          navItem('modules', 'Categories Breakdown'),
          navItem('schedule', 'Pending Responses')
        ];
      case 'student':
        return [
          navItem('classes', 'Courses'),
          navItem('assignments', 'Assignments'),
          navItem('grades', 'Grades')
        ];
      case 'student_assistant':
      default:
        return [
          navItem('assignments', 'Submissions Overview'),
          navItem('classes', 'Class Activity'),
          navItem('schedule', 'Deadlines'),
          navItem('modules', 'Instructor Notes')
        ];
    }
  })();

  const allItems = [...commonTop, ...roleNav, ...commonBottom];
  // Keep it tidy (dedupe by page)
  const seen = new Set();
  const deduped = allItems.filter((html) => {
    const m = html.match(/data-page="([^"]+)"/);
    const page = m ? m[1] : null;
    if (!page || seen.has(page)) return false;
    seen.add(page);
    return true;
  });

  return `<nav class="sidebar-nav">${deduped.join('')}</nav>`;
}

function getInstructorGradingStats() {
  const pending = gradingQueue.filter((x) => x.status === 'pending_grade');
  const dueSoon = assignmentSubmissions.filter((a) => !a.submitted).slice(0, 2);
  return { pending, dueSoon };
}

function getStudentDeadlineStats() {
  const pending = assignmentSubmissions.filter((a) => !a.submitted);
  const overdue = pending.filter((a) => new Date(a.dueDate).getTime() < new Date().setHours(0, 0, 0, 0));
  const upcoming = [...pending].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).slice(0, 3);
  return { pending, overdue, upcoming };
}

function generateRightPanel(role) {
  const commonHeader = `<div style="margin-bottom: 1rem;">
    <h3 style="margin: 0;">${role === 'student' || role === 'instructor' ? 'Action Center' : 'Quick Actions'}</h3>
    <p class="text-muted" style="margin-top: 0.3rem;">Priority items tailored for you</p>
  </div>`;

  if (role === 'admin') {
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>System Overview</h3>
        <div class="metrics-card">
          <div class="status-badge">Users</div>
          <div class="countdown-timer">${Object.keys(testUsers).length}</div>
          <div class="status-badge">Courses</div>
          <div class="countdown-timer">${classData.length}</div>
        </div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('admin')">Open Admin Panel</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Pending Issues</h3>
        <div class="status-badge">Open Tickets: ${supportTickets.filter(t => t.status === 'Open').length}</div>
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('concerns')">Review Concerns</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Active Timelines</h3>
        <div class="text-muted" style="font-size: 0.9rem;">Next key dates from Schedule</div>
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('schedule')">View Timeline</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Recent Activity</h3>
        <div class="text-muted" style="font-size: 0.9rem;">Latest grading & feedback updates</div>
      </div>
    `;
  }

  if (role === 'principal') {
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>Academic Performance</h3>
        <div class="metrics-card">
          <div class="status-badge">Top Grade</div>
          <div class="countdown-timer">A</div>
          <div class="status-badge">Avg GPA</div>
          <div class="countdown-timer">3.42</div>
        </div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('grades')">Open Grades</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Submission Rates</h3>
        <div class="text-muted" style="font-size: 0.9rem;">Track pending vs submitted</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('assignments')">See Assignments</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Critical Issues</h3>
        <div class="status-badge">Open Concerns: ${supportTickets.filter(t => t.status === 'Open').length}</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('concerns')">Triage Issues</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Key Dates</h3>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('schedule')">Open Key Dates</button>
        </div>
      </div>
    `;
  }

  if (role === 'academic_admin') {
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>Courses Needing Attention</h3>
        <div class="status-badge">At Risk: 2</div>
      </div>
      <div class="right-panel-card">
        <h3>Deadlines</h3>
        <div class="text-muted" style="font-size: 0.9rem;">See upcoming deadlines in Schedule</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('schedule')">Open Deadlines</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Submission Progress</h3>
        <div class="status-badge">Pending: ${assignmentSubmissions.filter(a => !a.submitted).length}</div>
      </div>
      <div class="right-panel-card">
        <h3>Flagged Concerns</h3>
        <div class="status-badge">Open: ${supportTickets.filter(t => t.status === 'Open').length}</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('concerns')">Review Flags</button>
        </div>
      </div>
    `;
  }

  if (role === 'program_coordinator') {
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>Program Progress</h3>
        <div class="status-badge">On Track: 4</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('classes')">View Courses</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Student Trends</h3>
        <div class="text-muted" style="font-size: 0.9rem;">Monitor performance trends</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('grades')">Open Trends</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Scheduled Activities</h3>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('schedule')">Open Calendar</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>At-Risk Students</h3>
        <div class="status-badge">Watchlist: 3</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('assignments')">Review Work</button>
        </div>
      </div>
    `;
  }

  if (role === 'instructor') {
    const stats = getInstructorGradingStats();
    const topQueue = stats.pending.slice(0, 4);
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>Pending Submissions to Grade</h3>
        <div class="status-badge">Queue: ${stats.pending.length}</div>
        <div style="margin-top: 0.75rem; display:flex; flex-direction: column; gap: 0.5rem;">
          ${topQueue.map((q) => `
            <div style="display:flex; justify-content: space-between; gap: 0.5rem; align-items:center;">
              <span style="font-weight: 600;">${q.studentName}</span>
              <span class="text-muted" style="font-size:0.85rem;">${formatDateOnly(q.submittedAt)}</span>
            </div>
          `).join('')}
        </div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('grading')">Start Grading</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Deadlines</h3>
        <div class="text-muted" style="font-size:0.9rem;">Next due: ${stats.dueSoon[0] ? formatDateOnly(stats.dueSoon[0].dueDate) : '—'}</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('assignments')">View Assignments</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Recent Submissions</h3>
        <div class="text-muted" style="font-size:0.9rem;">Check grading queue for latest work</div>
      </div>
      <div class="right-panel-card">
        <h3>Class Performance</h3>
        <div class="status-badge">Avg: A-/A</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('grades')">Open Performance</button>
        </div>
      </div>
    `;
  }

  if (role === 'counselor') {
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>New Concerns</h3>
        <div class="status-badge">Open: ${supportTickets.filter(t => t.status === 'Open').length}</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('concerns')">Review New</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>High-Priority Issues</h3>
        <div class="status-badge">High: ${supportTickets.filter(t => t.priority === 'High').length}</div>
      </div>
      <div class="right-panel-card">
        <h3>Categories Breakdown</h3>
        <div class="text-muted" style="font-size:0.9rem;">Course / assignment category trends</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('modules')">Explore Modules</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Pending Responses</h3>
        <div class="text-muted" style="font-size:0.9rem;">Follow up on answered vs open</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('messages')">Open Messages</button>
        </div>
      </div>
    `;
  }

  if (role === 'student') {
    const stats = getStudentDeadlineStats();
    const next = stats.upcoming[0];
    const targetDate = next ? new Date(`${next.dueDate}T23:59:59`) : null;
    return `
      ${commonHeader}
      <div class="right-panel-card">
        <h3>Upcoming Deadlines</h3>
        <div class="status-badge">Pending: ${stats.pending.length}</div>
        <div style="margin-top: 0.75rem;">
          <div class="text-muted" style="font-size:0.9rem;">Next up</div>
          <div style="font-weight:800; margin-top: 0.25rem;">${next ? next.title : 'No upcoming deadlines'}</div>
          <div class="text-muted" style="font-size:0.9rem; margin-top: 0.25rem;">Due ${next ? formatDateOnly(next.dueDate) : '—'}</div>
          <div class="countdown-timer" id="deadline-countdown">${targetDate ? '' : '—'}</div>
        </div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('assignments')">View Assignments</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Pending Assignments</h3>
        <div class="status-badge">Remaining: ${stats.pending.length}</div>
      </div>
      <div class="right-panel-card">
        <h3>Recent Grades</h3>
        <div class="text-muted" style="font-size:0.9rem;">Your latest results at a glance</div>
        <div class="card-action">
          <button class="btn btn-ghost btn-sm" onclick="navigateTo('grades')">Open Grades</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Announcements</h3>
        <div class="text-muted" style="font-size:0.9rem;">Stay updated via Messages</div>
        <div class="card-action">
          <button class="btn btn-primary btn-sm" onclick="navigateTo('messages')">Open Messages</button>
        </div>
      </div>
      <div class="right-panel-card">
        <h3>Late Submissions Warning</h3>
        <div class="status-badge" style="border-color: rgba(239, 68, 68, 0.35); color: #ef4444;">
          Overdue: ${stats.overdue.length}
        </div>
      </div>
    `;
  }

  // student_assistant
  return `
    ${commonHeader}
    <div class="right-panel-card">
      <h3>Submissions Overview</h3>
      <div class="status-badge">Pending: ${assignmentSubmissions.filter(a => !a.submitted).length}</div>
      <div class="card-action">
        <button class="btn btn-primary btn-sm" onclick="navigateTo('assignments')">Open Work</button>
      </div>
    </div>
    <div class="right-panel-card">
      <h3>Class Activity</h3>
      <div class="text-muted" style="font-size:0.9rem;">Student engagement metrics</div>
    </div>
    <div class="right-panel-card">
      <h3>Deadlines</h3>
      <div class="text-muted" style="font-size:0.9rem;">Use Schedule for upcoming dates</div>
      <div class="card-action">
        <button class="btn btn-ghost btn-sm" onclick="navigateTo('schedule')">Open Schedule</button>
      </div>
    </div>
    <div class="right-panel-card">
      <h3>Instructor Notes</h3>
      <div class="text-muted" style="font-size:0.9rem;">Quick access to course guidance</div>
      <div class="card-action">
        <button class="btn btn-primary btn-sm" onclick="navigateTo('modules')">Open Modules</button>
      </div>
    </div>
  `;
}

function renderRightPanelForRole(role) {
  const rp = document.getElementById('right-panel') || document.querySelector('.right-panel');
  if (!rp) return;

  rp.innerHTML = generateRightPanel(role);

  // Start countdown only for student (priority)
  if (role === 'student') {
    const next = assignmentSubmissions.filter((a) => !a.submitted).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
    if (next) {
      const targetDate = new Date(`${next.dueDate}T23:59:59`);
      startCountdownTimer(targetDate, 'deadline-countdown');
    }
  }
}

// === Dashboard ===
function renderDashboard() {
  let dashboardContent = '';

  if (currentUser.role === 'admin') {
    dashboardContent = renderAdminDashboard();
  } else if (currentUser.role === 'principal') {
    dashboardContent = renderPrincipalDashboard();
  } else if (currentUser.role === 'academic_admin') {
    dashboardContent = renderAcademicHeadDashboard();
  } else if (currentUser.role === 'program_coordinator') {
    dashboardContent = renderCourseHeadDashboard();
  } else if (currentUser.role === 'instructor') {
    dashboardContent = renderProfessorDashboard();
  } else if (currentUser.role === 'counselor') {
    dashboardContent = renderCounselorDashboard();
  } else if (currentUser.role === 'student_assistant') {
    dashboardContent = renderStudentAssistantDashboard();
  } else {
    dashboardContent = renderStudentDashboard();
  }

  document.getElementById('page-content').innerHTML = dashboardContent;
  renderRightPanelForRole(currentUser.role);
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

// Instructor Dashboard
function renderProfessorDashboard() {
  return `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome, <span style="color: var(--primary);">Instructor ${currentUser.name.split(' ')[1]}</span>.</h1>
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
        <button class="btn btn-primary" onclick="navigateTo('groups')">My Class Groups</button>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>3</h3>
          <p>Class Groups</p>
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

      <h2 class="mb-1">My Courses</h2>
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
              ${assignmentSubmissions.map(a => `
                <tr>
                  <td><strong>${a.title}</strong></td>
                  <td>${a.courseId}</td>
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
        <h1>My Courses</h1>
        <p class="text-muted">Manage your enrolled courses and access learning materials</p>
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
  const pendingCount = assignmentSubmissions.filter(a => !a.submitted).length;
  const submittedCount = assignmentSubmissions.filter(a => a.submitted).length;

  const filteredData = assignmentSubmissions.filter(a => {
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
        <button class="btn ${currentAssignmentFilter === 'all' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterAssignments('all')">All (${assignmentSubmissions.length})</button>
        <button class="btn ${currentAssignmentFilter === 'pending' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterAssignments('pending')">Pending (${pendingCount})</button>
        <button class="btn ${currentAssignmentFilter === 'submitted' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterAssignments('submitted')">Submitted (${submittedCount})</button>
      </div>

      ${filteredData.map((a, i) => `
        <div class="glass-card assignment-card animate-fade-in" style="animation-delay: ${i * 0.1}s; background: rgba(20, 22, 35, 0.4); margin-bottom: 1rem;">
          <div class="assignment-info">
            <h3>${a.title}</h3>
            <p class="text-muted">${a.courseId} • ${a.assignmentType} • ${a.module}</p>
            <div class="due-date">Due ${a.dueDate}</div>
            ${a.submitted ? `<p class="text-muted" style="margin: 0.5rem 0 0 0;">Grade: ${a.score}/${a.maxScore} (${a.status})</p>` : ''}
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
        <h1>Messages & Support</h1>
        <p class="text-muted">Communicate with instructors and manage support requests</p>
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

    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h2 style="margin: 0;">Support Tickets</h2>
        <span class="badge">${supportTickets.length}</span>
      </div>
      ${supportTickets.map(ticket => `
        <div class="support-ticket" style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div style="display:flex; justify-content: space-between; gap: 1rem; align-items: flex-start;">
            <div>
              <h3 style="margin: 0 0 0.25rem 0;">${ticket.title}</h3>
              <p class="text-muted" style="margin: 0 0 0.25rem 0;">${ticket.courseId} • ${ticket.status} • ${ticket.priority}</p>
              <p class="text-muted" style="margin: 0; font-size: 0.9rem;">Submitted by ${ticket.requester} on ${ticket.submittedOn}</p>
            </div>
          </div>
        </div>
      `).join('')}
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
        <p class="text-muted">View your course modules, deadlines, and exam dates</p>
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
        <h3 style="margin-top: 2rem;">Upcoming Schedule</h3>
        ${courseSchedule.map(item => `
          <div class="event-item">
            <div>
              <h3 style="margin: 0;">${item.title}</h3>
              <p class="text-muted">${item.courseId} • ${item.description}</p>
            </div>
            <div class="event-time">${item.date}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// === Class Groups ===
function renderGroups() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Class Groups</h1>
        <p class="text-muted">Join or create class sections and project teams</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary">Create Section</button>
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

// === Course Detail ===
function renderCourseDetail() {
  const courseId = currentPage === 'course' ? 'CS-402' : 'CS-402'; // Default course
  const course = classData.find(c => c.code === courseId);
  const courseModules = modules.filter(m => m.courseId === courseId);
  const courseAssignments = assignmentSubmissions.filter(a => a.courseId === courseId);
  
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>${course.title}</h1>
        <p class="text-muted">${course.code} • Instructor: ${course.teacher}</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in" style="margin-bottom: 2rem;">
      <div style="display: flex; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 2rem;">
        <button class="tab-button" onclick="switchTab('modules')" style="padding: 1rem; border: none; background: none; color: var(--primary); border-bottom: 2px solid var(--primary); cursor: pointer;">📚 Modules</button>
        <button class="tab-button" onclick="switchTab('course-assignments')" style="padding: 1rem; border: none; background: none; color: var(--text-muted); cursor: pointer;">✏️ Assignments</button>
        <button class="tab-button" onclick="switchTab('course-people')" style="padding: 1rem; border: none; background: none; color: var(--text-muted); cursor: pointer;">👥 People</button>
        <button class="tab-button" onclick="switchTab('course-grades')" style="padding: 1rem; border: none; background: none; color: var(--text-muted); cursor: pointer;">📈 Grades</button>
      </div>

      <div id="tab-content">
        <h3>Course Modules</h3>
        ${courseModules.map(mod => `
          <div class="glass-card" style="padding: 1.5rem; margin-bottom: 1rem; background: rgba(20, 22, 35, 0.4);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="margin: 0 0 0.5rem 0;">${mod.title}</h4>
                <p class="text-muted" style="margin: 0;">${mod.description}</p>
                <p class="text-muted" style="margin: 0.5rem 0 0 0; font-size: 0.85rem;">📅 ${mod.startDate} to ${mod.endDate}</p>
              </div>
              <button class="btn btn-primary btn-sm" onclick="navigateTo('lessons')">View Lessons</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// === Modules Page ===
function renderModulesPage() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Course Modules</h1>
        <p class="text-muted">Browse course weeks and topics</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
        <button class="btn ${currentModuleFilter === 'all' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterModules('all')">All (${modules.length})</button>
        <button class="btn ${currentModuleFilter === 'open' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterModules('open')">Open (${modules.filter(m => m.isOpen).length})</button>
      </div>

      ${modules.map((mod, i) => `
        <div class="glass-card animate-fade-in" style="animation-delay: ${i * 0.1}s; padding: 1.5rem; margin-bottom: 1rem; background: rgba(20, 22, 35, 0.4);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1;">
              <h3 style="margin: 0 0 0.5rem 0;">${mod.title}</h3>
              <p class="text-muted" style="margin: 0 0 0.5rem 0;">${mod.description}</p>
              <div style="display: flex; gap: 1rem; font-size: 0.9rem;">
                <span>📅 ${mod.startDate}</span>
                <span>Status: ${mod.isOpen ? '<span style="color: var(--primary);">✓ Open</span>' : '<span style="color: var(--text-muted);">Closed</span>'}</span>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="navigateTo('lessons')">View Lessons</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function filterModules(filter) {
  currentModuleFilter = filter;
  renderModulesPage();
}

// === Lessons Page ===
function renderLessonsPage() {
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Learning Materials</h1>
        <p class="text-muted">Study resources, videos, and guides</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>Available Lessons</h2>
      ${lessons.map((lesson, i) => `
        <div class="glass-card animate-fade-in" style="animation-delay: ${i * 0.1}s; padding: 1.5rem; margin-bottom: 1rem; background: rgba(20, 22, 35, 0.4);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1;">
              <h3 style="margin: 0 0 0.5rem 0;">
                ${lesson.type === 'video' ? '🎥' : lesson.type === 'pdf' ? '📄' : lesson.type === 'guide' ? '📖' : '🔗'} 
                ${lesson.title}
              </h3>
              <p class="text-muted" style="margin: 0;">${lesson.content}</p>
              <p class="text-muted" style="margin: 0.5rem 0 0 0; font-size: 0.85rem;">Type: ${lesson.type}</p>
            </div>
            <button class="btn btn-primary btn-sm">Open</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// === Grading Queue ===
function renderGradingQueue() {
  if (currentUser.role !== 'instructor' && currentUser.role !== 'academic_admin' && currentUser.role !== 'program_coordinator') {
    document.getElementById('page-content').innerHTML = `
      <div class="page-header animate-fade-in">
        <h1>Access Denied</h1>
        <p class="text-muted">Only instructors can access the grading queue.</p>
      </div>
    `;
    return;
  }

  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Submissions to Grade</h1>
        <p class="text-muted">Review and grade student submissions</p>
      </div>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>Pending Submissions (${gradingQueue.length})</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Student</th>
              <th>Submitted</th>
              <th>Version</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${gradingQueue.map(item => `
              <tr>
                <td><strong>${item.assignmentTitle}</strong></td>
                <td>${item.studentName}</td>
                <td>${new Date(item.submittedAt).toLocaleDateString()}</td>
                <td>v${item.version}</td>
                <td><button class="btn btn-primary btn-sm">Grade</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// === Concerns / Support System ===
function renderConcernsPage() {
  const filteredConcerns = currentConcernFilter === 'all' 
    ? supportTickets 
    : supportTickets.filter(t => t.status.toLowerCase() === currentConcernFilter);

  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Student Support & Feedback</h1>
        <p class="text-muted">Report issues, ask for clarification, or provide feedback</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="openConcernForm()">Submit New</button>
      </div>
    </div>

    <div class="glass-card animate-fade-in" style="margin-bottom: 2rem;">
      <h2>Submit a Concern</h2>
      <form style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" placeholder="Concern title" style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 8px; color: var(--text-main);">
        <textarea placeholder="Describe your concern..." style="width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 8px; color: var(--text-main); min-height: 100px; resize: none;"></textarea>
        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input type="checkbox" style="width: 18px; height: 18px; cursor: pointer;">
          <span>Submit anonymously</span>
        </label>
        <button type="submit" class="btn btn-primary">Submit Concern</button>
      </form>
    </div>

    <div class="glass-card animate-fade-in">
      <h2>Your Concerns</h2>
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
        <button class="btn ${currentConcernFilter === 'all' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterConcerns('all')">All (${supportTickets.length})</button>
        <button class="btn ${currentConcernFilter === 'open' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterConcerns('open')">Open (${supportTickets.filter(t => t.status === 'Open').length})</button>
        <button class="btn ${currentConcernFilter === 'answered' ? 'btn-primary' : 'btn-ghost'} btn-sm" onclick="filterConcerns('answered')">Answered (${supportTickets.filter(t => t.status === 'Answered').length})</button>
      </div>

      ${filteredConcerns.map(concern => `
        <div class="glass-card" style="padding: 1.5rem; margin-bottom: 1rem; background: rgba(20, 22, 35, 0.4);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1;">
              <h3 style="margin: 0 0 0.5rem 0;">${concern.title}</h3>
              <p class="text-muted" style="margin: 0 0 0.5rem 0;">${concern.courseId} • ${concern.priority} • ${concern.status}</p>
              <p style="margin: 0; font-size: 0.95rem;">Submitted by ${concern.requester} on ${concern.submittedOn}</p>
            </div>
            <span style="padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; ${concern.status === 'Open' ? 'background: rgba(239, 68, 68, 0.2); color: #ef4444;' : 'background: rgba(34, 197, 94, 0.2); color: #22c55e;'}">${concern.status}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function filterConcerns(filter) {
  currentConcernFilter = filter;
  renderConcernsPage();
}

// === Admin Panel ===
function renderAdminPanel() {
  if (!['admin', 'academic_admin', 'principal'].includes(currentUser.role)) {
    document.getElementById('page-content').innerHTML = `
      <div class="page-header animate-fade-in">
        <h1>Access Denied</h1>
        <p class="text-muted">Only administrators can access this panel.</p>
      </div>
    `;
    return;
  }

  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Administration Panel</h1>
        <p class="text-muted">Manage users, courses, and system settings</p>
      </div>
    </div>

    <div class="stats-grid animate-fade-in">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>${Object.keys(testUsers).length}</h3>
          <p>Total Users</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <h3>${classData.length}</h3>
          <p>Active Courses</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✏️</div>
        <div class="stat-content">
          <h3>${assignmentSubmissions.length}</h3>
          <p>Total Assignments</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>${supportTickets.filter(t => t.status === 'Open').length}</h3>
          <p>Open Support Tickets</p>
        </div>
      </div>
    </div>

    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>User Management</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${Object.values(testUsers).slice(0, 5).map(user => `
              <tr>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td><span class="badge">${user.role}</span></td>
                <td><button class="btn btn-sm btn-ghost">Edit</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>Recent Support Tickets</h2>
      ${supportTickets.map(ticket => `
        <div style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <p style="margin: 0 0 0.5rem 0; font-weight: 600;">${ticket.title}</p>
              <p class="text-muted" style="margin: 0; font-size: 0.9rem;">From: ${ticket.requester} • Status: ${ticket.status}</p>
            </div>
            <button class="btn btn-sm btn-primary">Review</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openConcernForm() {
  alert('Concern form would open in a modal. For now, use the form above to submit.');
}

/* =========================
   ROLE-BASED DASHBOARD SYSTEM
   ========================= */

/**
 * Generate role-specific sidebar HTML
 * @param {string} role - User role
 * @returns {string} HTML for sidebar navigation
 */
function generateRoleSidebar(role) {
  const sidebarConfig = {
    admin: [
      { section: 'Management', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'users', label: 'User Management', icon: '👥' },
        { page: 'courses', label: 'Courses', icon: '📚' },
        { page: 'timeline', label: 'Timeline & Deadlines', icon: '📅' }
      ]},
      { section: 'Operations', items: [
        { page: 'concerns', label: 'Concerns & Issues', icon: '💭' },
        { page: 'reports', label: 'Reports', icon: '📊' },
        { page: 'messages', label: 'Messages', icon: '💬' }
      ]},
      { section: 'Settings', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    principal: [
      { section: 'Oversight', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'courses', label: 'All Courses', icon: '📚' },
        { page: 'reports', label: 'Academic Reports', icon: '📈' },
        { page: 'concerns', label: 'Concerns', icon: '💭' }
      ]},
      { section: 'Monitoring', items: [
        { page: 'messages', label: 'Messages', icon: '💬' },
        { page: 'admin', label: 'System Health', icon: '⚡' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    academic_admin: [
      { section: 'Academic', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'courses', label: 'Manage Courses', icon: '📚' },
        { page: 'users', label: 'Faculty', icon: '👤' },
        { page: 'schedule', label: 'Schedule', icon: '📅' }
      ]},
      { section: 'Monitoring', items: [
        { page: 'submissions', label: 'Submissions', icon: '📝' },
        { page: 'concerns', label: 'Concerns', icon: '💭' },
        { page: 'messages', label: 'Messages', icon: '💬' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    program_coordinator: [
      { section: 'Program', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'courses', label: 'Program Courses', icon: '📚' },
        { page: 'users', label: 'Students', icon: '👥' },
        { page: 'schedule', label: 'Deadlines', icon: '📅' }
      ]},
      { section: 'Monitoring', items: [
        { page: 'progress', label: 'Progress Tracking', icon: '📈' },
        { page: 'concerns', label: 'Concerns', icon: '💭' },
        { page: 'messages', label: 'Messages', icon: '💬' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    instructor: [
      { section: 'Teaching', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'classes', label: 'My Classes', icon: '📚' },
        { page: 'grading', label: 'Grading Queue', icon: '✏️' },
        { page: 'schedule', label: 'Schedule', icon: '📅' }
      ]},
      { section: 'Interaction', items: [
        { page: 'messages', label: 'Messages', icon: '💬' },
        { page: 'submissions', label: 'Submissions', icon: '📥' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    counselor: [
      { section: 'Support', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'concerns', label: 'Concerns Inbox', icon: '💭' },
        { page: 'users', label: 'Students', icon: '👥' },
        { page: 'schedule', label: 'Meetings', icon: '📅' }
      ]},
      { section: 'Communication', items: [
        { page: 'messages', label: 'Messages', icon: '💬' },
        { page: 'reports', label: 'Reports', icon: '📊' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    student_assistant: [
      { section: 'Classroom', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'classes', label: 'Classes', icon: '📚' },
        { page: 'submissions', label: 'Submissions', icon: '📥' },
        { page: 'schedule', label: 'Deadlines', icon: '📅' }
      ]},
      { section: 'Collaboration', items: [
        { page: 'messages', label: 'Messages', icon: '💬' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ],
    student: [
      { section: 'Learning', items: [
        { page: 'dashboard', label: 'Dashboard', icon: '📊' },
        { page: 'classes', label: 'My Classes', icon: '📚' },
        { page: 'assignments', label: 'Assignments', icon: '✏️' },
        { page: 'grades', label: 'Grades', icon: '📈' }
      ]},
      { section: 'Community', items: [
        { page: 'groups', label: 'Study Groups', icon: '👥' },
        { page: 'messages', label: 'Messages', icon: '💬' },
        { page: 'schedule', label: 'Schedule', icon: '📅' }
      ]},
      { section: 'Account', items: [
        { page: 'profile', label: 'Profile', icon: '⚙️' }
      ]}
    ]
  };

  const config = sidebarConfig[role] || sidebarConfig.student;
  
  let html = '<nav class="sidebar-nav">';
  config.forEach(section => {
    html += `<div class="nav-section"><h3 class="nav-section-title">${section.section}</h3>`;
    section.items.forEach(item => {
      const isActive = item.page === currentPage ? 'active' : '';
      html += `<div class="nav-item ${isActive}" data-page="${item.page}">
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
      </div>`;
    });
    html += '</div>';
  });
  html += '</nav>';
  return html;
}

/**
 * Generate role-specific right panel HTML
 * @param {string} role - User role
 * @returns {string} HTML for right panel
 */
function generateRightPanel(role) {
  const panelGenerators = {
    admin: generateAdminRightPanel,
    principal: generatePrincipalRightPanel,
    academic_admin: generateAcademicAdminRightPanel,
    program_coordinator: generateCoordinatorRightPanel,
    instructor: generateInstructorRightPanel,
    counselor: generateCounselorRightPanel,
    student_assistant: generateStudentAssistantRightPanel,
    student: generateStudentRightPanel
  };

  const generator = panelGenerators[role] || panelGenerators.student;
  return generator();
}

// === Right Panel Generators ===

function generateAdminRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">System Overview</h3>
      
      <div class="right-panel-card">
        <div class="card-label">Total Users</div>
        <div class="card-value">1,234</div>
        <div class="card-subtext">+12 this week</div>
      </div>

      <div class="right-panel-card">
        <div class="card-label">Active Courses</div>
        <div class="card-value">45</div>
        <div class="card-subtext">8 starting soon</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Pending Issues</h3>
      
      <div class="right-panel-card urgent">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="status-badge urgent"></span>
          <span>2 unresolved concerns</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Recent Activity</h3>
      
      <div class="activity-feed">
        <div class="activity-item">
          <span>👤 New user registered</span>
          <span class="activity-time">2 min ago</span>
        </div>
        <div class="activity-item">
          <span>📊 Course created</span>
          <span class="activity-time">15 min ago</span>
        </div>
        <div class="activity-item">
          <span>⚠️ Support ticket opened</span>
          <span class="activity-time">1 hour ago</span>
        </div>
      </div>
    </div>
  `;
}

function generatePrincipalRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">Academic Performance</h3>
      
      <div class="right-panel-card">
        <div class="card-label">Avg Student GPA</div>
        <div class="card-value">3.42</div>
        <div class="card-subtext">↑ 0.05 from last term</div>
      </div>

      <div class="right-panel-card">
        <div class="card-label">On-Time Submissions</div>
        <div class="card-value">94%</div>
        <div class="card-subtext">↑ 2% improvement</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Critical Alerts</h3>
      
      <div class="right-panel-card urgent">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="status-badge urgent"></span>
          <span>3 unresolved concerns</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Key Academic Dates</h3>
      
      <div class="deadline-item">
        <span>📌 Final exams start</span>
        <span>May 15</span>
      </div>
      <div class="deadline-item">
        <span>📌 Grade submission</span>
        <span>May 25</span>
      </div>
    </div>
  `;
}

function generateAcademicAdminRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">Courses Needing Attention</h3>
      
      <div class="right-panel-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span>CS-402 Review</span>
          <span class="status-badge warning">⚠️</span>
        </div>
        <div class="card-subtext">8 pending submissions</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Upcoming Deadlines</h3>
      
      <div class="countdown-card">
        <div class="countdown-label">Next deadline in:</div>
        <div class="countdown-timer" id="countdown-academic">2d 05:30:45</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Submission Progress</h3>
      
      <div class="progress-item">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>CS-402</span>
          <span>24/30</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: 80%;"></div>
        </div>
      </div>
    </div>
  `;
}

function generateCoordinatorRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">Program Progress</h3>
      
      <div class="right-panel-card">
        <div class="card-label">Active Courses</div>
        <div class="card-value">12</div>
        <div class="card-subtext">Enrolled: 450 students</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">At-Risk Students</h3>
      
      <div class="right-panel-card warning">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="status-badge warning">⚠️</span>
          <span>5 students below threshold</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Upcoming Events</h3>
      
      <div class="deadline-item">
        <span>🎓 Thesis Defense Schedule</span>
        <span>May 20</span>
      </div>
      <div class="deadline-item">
        <span>📅 Final Projects Due</span>
        <span>May 28</span>
      </div>
    </div>
  `;
}

function generateInstructorRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">⏱️ Grading Queue</h3>
      
      <div class="right-panel-card urgent">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">23 Submissions</div>
        <div class="card-subtext">Waiting for grading</div>
        <button class="btn btn-sm btn-primary" onclick="navigateTo('grading')" style="width: 100%; margin-top: 0.75rem;">Start Grading</button>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Next Deadline</h3>
      
      <div class="countdown-card">
        <div class="countdown-label">Assignment due in:</div>
        <div class="countdown-timer" id="countdown-instructor">1d 12:45:30</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Recent Submissions</h3>
      
      <div class="submission-feed">
        <div class="submission-item">
          <span>📝 Jordan Smith</span>
          <span class="activity-time">5 min ago</span>
        </div>
        <div class="submission-item">
          <span>📝 Casey Brown</span>
          <span class="activity-time">12 min ago</span>
        </div>
        <div class="submission-item">
          <span>📝 Alex Morgan</span>
          <span class="activity-time">28 min ago</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Class Overview</h3>
      
      <div class="metrics-row">
        <div class="metric-mini">
          <div>Enrolled</div>
          <div class="metric-value">45</div>
        </div>
        <div class="metric-mini">
          <div>Avg Grade</div>
          <div class="metric-value">A-</div>
        </div>
      </div>
    </div>
  `;
}

function generateCounselorRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">New Concerns</h3>
      
      <div class="right-panel-card urgent">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
          <span class="status-badge urgent">🔴</span>
          <span style="font-weight: 600;">3 New Issues</span>
        </div>
        <div class="card-subtext">1 marked high-priority</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">High-Priority Issues</h3>
      
      <div class="concern-list">
        <div class="concern-item">
          <span>🚨 Academic Stress</span>
          <span class="concern-time">2 hours ago</span>
        </div>
        <div class="concern-item">
          <span>💔 Personal Issues</span>
          <span class="concern-time">5 hours ago</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Pending Responses</h3>
      
      <div class="right-panel-card">
        <div class="card-label">Aging Issues</div>
        <div class="card-value">7</div>
        <div class="card-subtext">Avg age: 2.5 days</div>
      </div>
    </div>
  `;
}

function generateStudentAssistantRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">Submissions Overview</h3>
      
      <div class="right-panel-card">
        <div class="card-label">Pending Review</div>
        <div class="card-value">8</div>
        <div class="card-subtext">From 4 classes</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Class Activity</h3>
      
      <div class="activity-feed">
        <div class="activity-item">
          <span>📝 New submission</span>
          <span class="activity-time">10 min ago</span>
        </div>
        <div class="activity-item">
          <span>💬 3 new messages</span>
          <span class="activity-time">25 min ago</span>
        </div>
        <div class="activity-item">
          <span>✅ Grading complete</span>
          <span class="activity-time">1 hour ago</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Upcoming Deadlines</h3>
      
      <div class="deadline-item">
        <span>Project Submission</span>
        <span>May 12</span>
      </div>
    </div>
  `;
}

function generateStudentRightPanel() {
  return `
    <div class="right-panel-content animate-fade-in">
      <h3 class="right-panel-title">📌 Upcoming Deadlines</h3>
      
      <div class="countdown-card">
        <div class="countdown-label">Next deadline in:</div>
        <div class="countdown-timer" id="countdown-student">3d 18:22:15</div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Pending Assignments</h3>
      
      <div class="assignment-list">
        <div class="assignment-item">
          <span>Advanced Web Systems</span>
          <span class="due-badge">Due in 2d</span>
        </div>
        <div class="assignment-item">
          <span>AI Project Proposal</span>
          <span class="due-badge">Due in 4d</span>
        </div>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Recent Grades</h3>
      
      <div class="grade-item">
        <span>CS-402 Midterm</span>
        <span class="grade-badge">A-</span>
      </div>
      <div class="grade-item">
        <span>CS-301 Project</span>
        <span class="grade-badge">A</span>
      </div>

      <h3 class="right-panel-title" style="margin-top: 1.5rem;">Messages</h3>
      
      <div class="right-panel-card">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="badge">3</span>
          <span>Unread messages</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Main dashboard render function - routes to role-specific dashboard
 */
function renderDashboard() {
  // Update sidebar with role-specific items
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = generateRoleSidebar(currentUser.role);
    // Reattach click handlers to new nav items
    initNav();
  }

  // Update right panel with role-specific content
  const rightPanel = document.querySelector('.right-panel');
  if (rightPanel) {
    rightPanel.innerHTML = generateRightPanel(currentUser.role);
    
    // Start countdown timers
    const academicCountdown = document.getElementById('countdown-academic');
    const instructorCountdown = document.getElementById('countdown-instructor');
    const studentCountdown = document.getElementById('countdown-student');
    
    if (academicCountdown) {
      const targetDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000);
      startCountdownTimer(targetDate, 'countdown-academic');
    }
    if (instructorCountdown) {
      const targetDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 45 * 60 * 1000 + 30 * 1000);
      startCountdownTimer(targetDate, 'countdown-instructor');
    }
    if (studentCountdown) {
      const targetDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000 + 22 * 60 * 1000 + 15 * 1000);
      startCountdownTimer(targetDate, 'countdown-student');
    }
  }

  // Render role-specific dashboard content
  document.getElementById('page-content').innerHTML = `
    <div class="page-header animate-fade-in">
      <div class="header-content">
        <h1>Welcome back, ${currentUser.name}! 👋</h1>
        <p class="text-muted">${getRoleDisplay()} Dashboard</p>
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
          <h3>3.72</h3>
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

    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>My Courses</h2>
      <div class="launchpad-grid">
        <div class="class-card animate-fade-in">
          <div class="class-header">
            <h3>Advanced Web Systems</h3>
            <span class="class-code">CS-402</span>
          </div>
          <p class="text-muted">Instructor: Dr. Robert Chen</p>
          <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1rem;">Open Course</button>
        </div>
        <div class="class-card animate-fade-in">
          <div class="class-header">
            <h3>Artificial Intelligence</h3>
            <span class="class-code">CS-301</span>
          </div>
          <p class="text-muted">Instructor: Dr. Patricia Williams</p>
          <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1rem;">Open Course</button>
        </div>
        <div class="class-card animate-fade-in">
          <div class="class-header">
            <h3>Cloud Infrastructure</h3>
            <span class="class-code">IT-305</span>
          </div>
          <p class="text-muted">Instructor: Dr. Michael Henderson</p>
          <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1rem;">Open Course</button>
        </div>
      </div>
    </div>

    <div class="glass-card animate-fade-in" style="margin-top: 2rem;">
      <h2>Upcoming Assignments</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Midterm Exam</strong></td>
              <td>CS-402</td>
              <td>May 15, 2026</td>
              <td><span class="badge" style="background: #f59e0b;">Pending</span></td>
            </tr>
            <tr>
              <td><strong>Project Proposal</strong></td>
              <td>CS-301</td>
              <td>May 18, 2026</td>
              <td><span class="badge" style="background: #f59e0b;">In Progress</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
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
              <p class="text-muted" style="margin: 0.25rem 0 0 0; font-size: 0.8rem;">Role: <strong>${getRoleDisplay()}</strong></p>
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

    <!-- 3-Column App Shell -->
    <div class="app-shell">
      <!-- Sidebar Navigation -->
      <aside class="sidebar" id="left-sidebar"></aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <div id="page-content"></div>
      </main>

      <!-- Right Panel (role-specific) -->
      <aside class="right-panel" id="right-panel"></aside>
    </div>

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
