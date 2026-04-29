// ============================================================
//  THESIS FLOW — Mock Data
//  Simulates a Firestore-like in-memory database for the demo.
// ============================================================

const DB = {

  // ── USERS ──────────────────────────────────────────────────
  users: [
    {
      id: 'u1',
      name: 'Ana Reyes',
      email: 'student@plmun.edu.ph',
      password: 'demo1234',
      role: 'student',
      groupId: 'g1',
      avatar: 'AR',
      program: 'BS Computer Science',
      yearLevel: '4th Year',
      createdAt: '2025-08-01'
    },
    {
      id: 'u2',
      name: 'Carlo Santos',
      email: 'carlos@plmun.edu.ph',
      password: 'demo1234',
      role: 'student',
      groupId: 'g1',
      avatar: 'CS',
      program: 'BS Computer Science',
      yearLevel: '4th Year',
      createdAt: '2025-08-01'
    },
    {
      id: 'u3',
      name: 'Maya Cruz',
      email: 'maya@plmun.edu.ph',
      password: 'demo1234',
      role: 'student',
      groupId: 'g2',
      avatar: 'MC',
      program: 'BS Information Technology',
      yearLevel: '3rd Year',
      createdAt: '2025-08-03'
    },
    {
      id: 'u4',
      name: 'Luis Bautista',
      email: 'luis@plmun.edu.ph',
      password: 'demo1234',
      role: 'student',
      groupId: 'g2',
      avatar: 'LB',
      program: 'BS Information Technology',
      yearLevel: '3rd Year',
      createdAt: '2025-08-03'
    },
    {
      id: 'u5',
      name: 'Sofia Lim',
      email: 'sofia@plmun.edu.ph',
      password: 'demo1234',
      role: 'student',
      groupId: 'g3',
      avatar: 'SL',
      program: 'BS Computer Engineering',
      yearLevel: '4th Year',
      createdAt: '2025-08-05'
    },
    {
      id: 'u6',
      name: 'Dr. Ramon Torres',
      email: 'adviser@plmun.edu.ph',
      password: 'demo1234',
      role: 'adviser',
      groupId: null,
      avatar: 'RT',
      department: 'College of Computing',
      specialization: 'Machine Learning, Data Science',
      createdAt: '2025-07-15'
    },
    {
      id: 'u7',
      name: 'Prof. Elena Navarro',
      email: 'elena@plmun.edu.ph',
      password: 'demo1234',
      role: 'adviser',
      groupId: null,
      avatar: 'EN',
      department: 'College of Engineering',
      specialization: 'IoT, Embedded Systems',
      createdAt: '2025-07-15'
    },
    {
      id: 'u8',
      name: 'Admin User',
      email: 'admin@plmun.edu.ph',
      password: 'demo1234',
      role: 'admin',
      groupId: null,
      avatar: 'AU',
      createdAt: '2025-07-01'
    }
  ],

  // ── GROUPS ─────────────────────────────────────────────────
  groups: [
    {
      id: 'g1',
      title: 'SmartLearn: AI-Powered Adaptive Learning System',
      description: 'A web-based adaptive learning platform using ML to personalize study paths for college students.',
      status: 'In Progress',
      phase: 'Capstone 1',
      progress: {
        currentStage: 2, // Chapter 2
        stages: ['Title Proposal', 'Chapter 1 (Intro)', 'Chapter 2 (RRL)', 'Chapter 3 (Methodology)', 'Proposal Defense']
      },
      adviserId: 'u6',
      memberIds: ['u1', 'u2'],
      program: 'BS Computer Science',
      createdAt: '2025-08-10',
      tags: ['AI', 'Web', 'Education']
    },
    {
      id: 'g2',
      title: 'CampusConnect: Student Event Management App',
      description: 'A mobile-first platform for discovering, joining, and managing campus events and organizations.',
      status: 'For Review',
      phase: 'Capstone 1',
      progress: {
        currentStage: 4, // Proposal Defense
        stages: ['Title Proposal', 'Chapter 1 (Intro)', 'Chapter 2 (RRL)', 'Chapter 3 (Methodology)', 'Proposal Defense']
      },
      adviserId: 'u7',
      memberIds: ['u3', 'u4'],
      program: 'BS Information Technology',
      createdAt: '2025-08-12',
      tags: ['Mobile', 'Events', 'UX']
    },
    {
      id: 'g3',
      title: 'EcoTrack: IoT-Based Environmental Monitoring',
      description: 'A real-time environmental monitoring system using IoT sensors to track air quality and temperature.',
      status: 'Approved',
      phase: 'Capstone 2',
      progress: {
        currentStage: 4, // Final Defense
        stages: ['Chapter 4 (Results)', 'Chapter 5 (Conclusion)', 'System Prototype', 'Final Manuscript', 'Final Defense']
      },
      adviserId: 'u7',
      memberIds: ['u5'],
      program: 'BS Computer Engineering',
      createdAt: '2025-08-15',
      tags: ['IoT', 'Hardware', 'Environment']
    },
    {
      id: 'g4',
      title: 'MediTrack: Patient Health Records System',
      description: 'A secure digital health records platform for small clinics, with appointment scheduling.',
      status: 'Pending',
      phase: 'Capstone 1',
      progress: {
        currentStage: 0, // Title Proposal
        stages: ['Title Proposal', 'Chapter 1 (Intro)', 'Chapter 2 (RRL)', 'Chapter 3 (Methodology)', 'Proposal Defense']
      },
      adviserId: null,
      memberIds: [],
      program: 'BS Information Systems',
      createdAt: '2025-09-01',
      tags: ['Health', 'Database', 'Security']
    }
  ],

  // ── SUBMISSIONS ─────────────────────────────────────────────
  submissions: [
    {
      id: 's1',
      threadId: 't1',
      version: 1,
      groupId: 'g1',
      title: 'Chapter 1 - Introduction',
      description: 'Initial draft covering background and problem statement.',
      type: 'Chapter',
      status: 'Rejected',
      fileUrl: '#',
      fileName: 'G1_Chapter1_v1.pdf',
      fileSize: '1.2 MB',
      submittedBy: 'u1',
      submittedAt: '2025-09-05',
      reviewedAt: '2025-09-08',
      reviewedBy: 'u6'
    },
    {
      id: 's1_v2',
      threadId: 't1',
      version: 2,
      groupId: 'g1',
      title: 'Chapter 1 - Introduction',
      description: 'Revised draft with updated SMART objectives.',
      type: 'Chapter',
      status: 'Reviewed',
      fileUrl: '#',
      fileName: 'G1_Chapter1_v2.pdf',
      fileSize: '1.3 MB',
      submittedBy: 'u1',
      submittedAt: '2025-09-12',
      reviewedAt: '2025-09-15',
      reviewedBy: 'u6'
    },
    {
      id: 's2',
      threadId: 't2',
      version: 1,
      groupId: 'g1',
      title: 'Chapter 2 - Review of Related Literature',
      description: 'Synthesis of local and foreign literature related to adaptive learning and AI in education.',
      type: 'Chapter',
      status: 'Pending',
      fileUrl: '#',
      fileName: 'G1_Chapter2_RRL.pdf',
      fileSize: '2.4 MB',
      submittedBy: 'u2',
      submittedAt: '2025-09-20',
      reviewedAt: null,
      reviewedBy: null
    },
    {
      id: 's3',
      threadId: 't3',
      version: 1,
      groupId: 'g2',
      title: 'Proposal Document',
      description: 'Full thesis proposal including title, abstract, conceptual framework, and methodology.',
      type: 'Proposal',
      status: 'Approved',
      fileUrl: '#',
      fileName: 'G2_Proposal_Final.pdf',
      fileSize: '3.1 MB',
      submittedBy: 'u3',
      submittedAt: '2025-08-25',
      reviewedAt: '2025-08-30',
      reviewedBy: 'u7'
    },
    {
      id: 's4',
      threadId: 't4',
      version: 1,
      groupId: 'g2',
      title: 'System Mockups & Wireframes',
      description: 'High-fidelity UI mockups for the CampusConnect mobile application.',
      type: 'Supporting Document',
      status: 'Pending',
      fileUrl: '#',
      fileName: 'G2_Mockups_v2.pdf',
      fileSize: '5.8 MB',
      submittedBy: 'u4',
      submittedAt: '2025-10-01',
      reviewedAt: null,
      reviewedBy: null
    },
    {
      id: 's5',
      threadId: 't5',
      version: 1,
      groupId: 'g3',
      title: 'Final Thesis Document',
      description: 'Complete thesis manuscript with all chapters, appendices, and technical documentation.',
      type: 'Final Manuscript',
      status: 'Approved',
      fileUrl: '#',
      fileName: 'G3_Final_Thesis.pdf',
      fileSize: '8.2 MB',
      submittedBy: 'u5',
      submittedAt: '2025-11-10',
      reviewedAt: '2025-11-14',
      reviewedBy: 'u7'
    }
  ],

  // ── SCHEDULES ───────────────────────────────────────────────
  schedules: [
    {
      id: 'sch1',
      groupId: 'g1',
      title: 'Chapter 1 Defense',
      description: 'Oral defense of the Introduction chapter with the adviser panel.',
      type: 'Defense',
      date: '2025-10-10',
      time: '10:00 AM',
      venue: 'Room 301, IT Building',
      status: 'Done',
      attendees: ['u1', 'u2', 'u6'],
      createdBy: 'u6'
    },
    {
      id: 'sch2',
      groupId: 'g1',
      title: 'Chapter 2-3 Consultation',
      description: 'Progress consultation on RRL and methodology chapters.',
      type: 'Consultation',
      date: '2025-10-28',
      time: '2:00 PM',
      venue: 'Faculty Room 105',
      status: 'Upcoming',
      attendees: ['u1', 'u2', 'u6'],
      createdBy: 'u6'
    },
    {
      id: 'sch3',
      groupId: 'g2',
      title: 'Proposal Defense',
      description: 'Panel defense of the CampusConnect proposal.',
      type: 'Defense',
      date: '2025-09-15',
      time: '9:00 AM',
      venue: 'Conference Room A',
      status: 'Done',
      attendees: ['u3', 'u4', 'u7'],
      createdBy: 'u7'
    },
    {
      id: 'sch4',
      groupId: 'g2',
      title: 'System Demo & Mid-Defense',
      description: 'Demonstration of the working prototype to the panel.',
      type: 'Defense',
      date: '2025-11-05',
      time: '1:00 PM',
      venue: 'Lab 204, IT Building',
      status: 'Upcoming',
      attendees: ['u3', 'u4', 'u7'],
      createdBy: 'u8'
    },
    {
      id: 'sch5',
      groupId: 'g3',
      title: 'Final Oral Defense',
      description: 'Final thesis defense before the panel of judges.',
      type: 'Final Defense',
      date: '2025-11-20',
      time: '8:00 AM',
      venue: 'Auditorium Hall B',
      status: 'Upcoming',
      attendees: ['u5', 'u7', 'u8'],
      createdBy: 'u8'
    }
  ],

  // ── FEEDBACK ────────────────────────────────────────────────
  feedback: [
    {
      id: 'fb1',
      groupId: 'g1',
      submissionId: 's1',
      authorId: 'u6',
      content: 'Chapter 1 is well-written. The problem statement is clearly defined. However, please revisit the scope and limitations section — be more specific about what the system will NOT cover.',
      rating: 4,
      createdAt: '2025-09-08T10:30:00'
    },
    {
      id: 'fb2',
      groupId: 'g1',
      submissionId: 's1',
      authorId: 'u6',
      content: 'Objectives need to follow the SMART framework. Please revise objectives 3 and 4 to be more measurable.',
      rating: null,
      createdAt: '2025-09-08T10:45:00'
    },
    {
      id: 'fb3',
      groupId: 'g2',
      submissionId: 's3',
      authorId: 'u7',
      content: 'Excellent proposal! The conceptual framework is solid and the methodology is appropriate. Approved for proceeding to Chapter 1. Minor: fix citation format in page 12.',
      rating: 5,
      createdAt: '2025-08-30T14:00:00'
    },
    {
      id: 'fb4',
      groupId: 'g3',
      submissionId: 's5',
      authorId: 'u7',
      content: 'Outstanding work. The IoT integration is well-documented. Results chapter demonstrates clear validation of the system objectives. Highly commended.',
      rating: 5,
      createdAt: '2025-11-14T09:00:00'
    }
  ],

  // ── NOTIFICATIONS ───────────────────────────────────────────
  notifications: [
    {
      id: 'n1',
      userId: 'u1',
      title: 'Feedback Received',
      message: 'Dr. Torres left feedback on your Chapter 1 submission.',
      type: 'feedback',
      read: false,
      createdAt: '2025-09-08T10:30:00',
      link: 'feedback'
    },
    {
      id: 'n2',
      userId: 'u1',
      title: 'Schedule Added',
      message: 'A consultation has been scheduled on Oct 28 at 2:00 PM.',
      type: 'schedule',
      read: false,
      createdAt: '2025-10-01T08:00:00',
      link: 'schedules'
    },
    {
      id: 'n3',
      userId: 'u1',
      title: 'Submission Pending Review',
      message: 'Chapter 2 - RRL is awaiting adviser review.',
      type: 'submission',
      read: false,
      createdAt: '2025-09-20T15:00:00',
      link: 'submissions'
    },
    {
      id: 'n4',
      userId: 'u3',
      title: 'Proposal Approved!',
      message: 'Prof. Navarro approved your proposal. Proceed to Chapter 1.',
      type: 'approval',
      read: true,
      createdAt: '2025-08-30T14:00:00',
      link: 'submissions'
    },
    {
      id: 'n5',
      userId: 'u6',
      title: 'New Submission',
      message: 'Group SmartLearn submitted Chapter 2 for review.',
      type: 'submission',
      read: false,
      createdAt: '2025-09-20T15:00:00',
      link: 'submissions'
    }
  ]
};

// ── HELPER FUNCTIONS ────────────────────────────────────────

const MockDB = {

  // Users
  getUserByEmail(email) {
    return DB.users.find(u => u.email === email) || null;
  },
  getUserById(id) {
    return DB.users.find(u => u.id === id) || null;
  },
  getAllUsers() {
    return [...DB.users];
  },
  getUsersByRole(role) {
    return DB.users.filter(u => u.role === role);
  },
  addUser(user) {
    DB.users.push(user);
  },

  // Groups
  getAllGroups() {
    return [...DB.groups];
  },
  getGroupById(id) {
    return DB.groups.find(g => g.id === id) || null;
  },
  getGroupByUserId(userId) {
    const user = this.getUserById(userId);
    if (!user || !user.groupId) return null;
    return this.getGroupById(user.groupId);
  },
  getGroupsByAdviserId(adviserId) {
    return DB.groups.filter(g => g.adviserId === adviserId);
  },
  addGroup(group) {
    DB.groups.push(group);
    return group;
  },
  updateGroupStatus(groupId, status) {
    const g = DB.groups.find(g => g.id === groupId);
    if (g) g.status = status;
  },
  updateGroupProgress(groupId, stageIndex) {
    const g = DB.groups.find(g => g.id === groupId);
    if (g) {
      g.progress.currentStage = stageIndex;
      // Automatically update status based on progress if needed
      if (stageIndex === g.progress.stages.length - 1) {
        g.status = 'Approved';
      }
    }
  },
  updateGroupPhase(groupId, phase) {
    const g = DB.groups.find(g => g.id === groupId);
    if (g) {
      g.phase = phase;
      g.progress.currentStage = 0;
      g.progress.stages = phase === 'Capstone 1' 
        ? ['Title Proposal', 'Chapter 1 (Intro)', 'Chapter 2 (RRL)', 'Chapter 3 (Methodology)', 'Proposal Defense']
        : ['Chapter 4 (Results)', 'Chapter 5 (Conclusion)', 'System Prototype', 'Final Manuscript', 'Final Defense'];
    }
  },

  // Submissions
  getAllSubmissions() {
    return [...DB.submissions];
  },
  getSubmissionsByGroup(groupId) {
    return DB.submissions.filter(s => s.groupId === groupId);
  },
  getSubmissionsForAdviser(adviserId) {
    const groupIds = this.getGroupsByAdviserId(adviserId).map(g => g.id);
    return DB.submissions.filter(s => groupIds.includes(s.groupId));
  },
  addSubmission(submission) {
    // If it's a re-submission (has threadId), set version automatically
    if (submission.threadId) {
      const versions = DB.submissions.filter(s => s.threadId === submission.threadId);
      submission.version = versions.length + 1;
    } else {
      submission.threadId = this.genId('t');
      submission.version = 1;
    }
    DB.submissions.push(submission);
    return submission;
  },
  updateSubmissionStatus(submissionId, status) {
    const s = DB.submissions.find(s => s.id === submissionId);
    if (s) {
      s.status = status;
      s.reviewedAt = new Date().toISOString().split('T')[0];
      s.reviewedBy = getCurrentUser ? getCurrentUser().id : 'u8'; // Fallback to admin
    }
  },

  // Schedules
  getAllSchedules() {
    return [...DB.schedules];
  },
  getSchedulesByGroup(groupId) {
    return DB.schedules.filter(s => s.groupId === groupId);
  },
  getSchedulesForUser(userId) {
    return DB.schedules.filter(s => s.attendees.includes(userId));
  },
  addSchedule(schedule) {
    DB.schedules.push(schedule);
    return schedule;
  },

  // Feedback
  getAllFeedback() {
    return [...DB.feedback];
  },
  getFeedbackByGroup(groupId) {
    return DB.feedback.filter(f => f.groupId === groupId);
  },
  getFeedbackBySubmission(submissionId) {
    return DB.feedback.filter(f => f.submissionId === submissionId);
  },
  addFeedback(fb) {
    DB.feedback.push(fb);
    return fb;
  },

  // Notifications
  getNotificationsForUser(userId) {
    return DB.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getUnreadCount(userId) {
    return DB.notifications.filter(n => n.userId === userId && !n.read).length;
  },
  markAllRead(userId) {
    DB.notifications.filter(n => n.userId === userId).forEach(n => n.read = true);
  },
  addNotification(notif) {
    DB.notifications.push(notif);
  },

  // ID Generator
  genId(prefix) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Stats helpers
  getStats() {
    return {
      totalStudents: DB.users.filter(u => u.role === 'student').length,
      totalAdvisers: DB.users.filter(u => u.role === 'adviser').length,
      totalGroups: DB.groups.length,
      totalSubmissions: DB.submissions.length,
      pendingSubmissions: DB.submissions.filter(s => s.status === 'Pending').length,
      approvedGroups: DB.groups.filter(g => g.status === 'Approved').length,
      upcomingSchedules: DB.schedules.filter(s => s.status === 'Upcoming').length
    };
  }
};
