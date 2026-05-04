# CampusFlow - Modern Learning Management System

CampusFlow is a modern, intuitive Learning Management System (LMS) designed for campus education. Built with a sleek, glassmorphic UI and powered by vanilla JavaScript, it provides students and instructors with a comprehensive platform for managing classes, assignments, grades, and collaboration.

## Features

### For Students
- **Dashboard** - Overview of classes, assignments, and upcoming events
- **My Classes** - View enrolled classes with course materials
- **Assignments** - Track pending and submitted assignments
- **Grades** - Monitor your academic performance
- **Messages** - Direct communication with instructors and peers
- **Schedule** - Calendar view of classes and important dates
- **Study Groups** - Connect and collaborate with other students
- **Directory** - Find and contact other students and instructors
- **Profile** - Manage personal information and preferences

### For Instructors
- **Dashboard** - Overview of taught classes and student engagement
- **Class Management** - Create and manage course materials
- **Assignment Grading** - Review and grade student submissions
- **Grade Management** - Record and manage student grades
- **Student Directory** - View enrolled students and their information
- **Profile** - Manage instructor information and settings

## Defense-Ready System Overview (5 Core Components)

CampusFlow is an LMS organized around a small set of core system engines, so access control, learning structure, assessments, deadlines, and support all work consistently.

1. 👥 User & Role Management (RBAC) — access control  
“The system uses role-based access control to ensure that users only access features relevant to their responsibilities.”

2. 📚 Course & Content Management — learning structure  
“The system structures learning using a hierarchical model of courses, modules, and lessons.”

3. 📤 Assessment & Submission System — version-controlled submissions (your strongest differentiator)  
“The system enhances traditional LMS functionality by implementing version-controlled submissions, allowing tracking of student progress across multiple attempts.”

4. 📅 Scheduling & Timeline Control — deadlines & availability  
“A timeline module ensures that academic activities follow a structured schedule and prevents unregulated submissions.”

5. 💬 Feedback & Support System — structured issue resolution  
“The system includes a structured feedback mechanism that allows students to report concerns safely while enabling administrators to track and resolve issues.”

**How the system works as a whole:**  
“The system integrates user management controls access, course management organizes learning materials, the assessment system handles submissions and grading, the timeline enforces deadlines, and the feedback system ensures communication and issue resolution.”

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Glassmorphic design with CSS Grid and Flexbox
- **Architecture**: Single-page application with client-side routing

## Project Structure

```
campus-flow/
├── index.html          # Main HTML entry point
├── js/
│   ├── app.js         # Main application logic and routing
│   ├── auth.js        # Authentication functionality
│   ├── router.js      # Client-side routing
│   ├── ui.js          # UI utility functions
│   └── pages/         # Individual page components
└── styles/
    └── main.css       # Main stylesheet with glassmorphic design
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hamatmeyou/CampusFlow.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

Open your browser and navigate to the local development server to start using CampusFlow.

## Styling

The application uses a modern glassmorphic design with semi-transparent glass cards, backdrop blur effects, and smooth animations.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

ISC

---

**CampusFlow** - Streamline your campus learning experience
