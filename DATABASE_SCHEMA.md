# CampusFlow LMS — Database Schema

## Overview
This document defines the complete database schema for CampusFlow LMS, including all entities, fields, relationships, and constraints.

---

## 📊 Entity Definitions

### 1. Users
Represents all system users with role-based access control.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Unique user identifier |
| name | String | ✓ | | Full name |
| email | String | ✓ | ✓ | Email address |
| password | String | ✓ | | Hashed password |
| role | Enum | ✓ | | `admin`, `academic_admin`, `program_coordinator`, `instructor`, `counselor`, `student_assistant`, `student` |
| department | String | | | Department/Faculty assignment |
| avatar | String | | | Profile picture URL |
| gpa | Float | | | Student GPA (nullable) |
| major | String | | | Student major (nullable) |
| year | Integer | | | Student year (1-4, nullable) |
| permissions | Array | ✓ | | List of permission codes |
| createdAt | DateTime | ✓ | | Account creation timestamp |
| updatedAt | DateTime | ✓ | | Last update timestamp |

**Example:**
```json
{
  "id": "student1",
  "name": "Michael Torres",
  "email": "m.torres@university.edu",
  "role": "student",
  "gpa": 3.72,
  "major": "Computer Science",
  "year": 4,
  "createdAt": "2026-01-15T10:30:00Z"
}
```

---

### 2. Courses
Represents academic courses offered.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Course code (e.g., CS-402) |
| title | String | ✓ | | Course name |
| description | String | | | Course overview |
| instructorId | String | ✓ | | Reference to instructor User |
| department | String | ✓ | | Department offering course |
| code | String | ✓ | | Official course code |
| maxStudents | Integer | | | Enrollment cap |
| credits | Integer | | | Credit hours |
| image | String | | | Course thumbnail image URL |
| createdAt | DateTime | ✓ | | Course creation date |
| updatedAt | DateTime | ✓ | | Last update timestamp |

**Example:**
```json
{
  "id": "CS-402",
  "title": "Advanced Web Systems",
  "code": "CS-402",
  "instructorId": "sarah1",
  "department": "Computer Science",
  "credits": 3,
  "image": "https://images.unsplash.com/...",
  "createdAt": "2026-01-10T09:00:00Z"
}
```

---

### 3. Enrollments
Represents user-course relationships and enrollment status.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Enrollment identifier |
| courseId | String | ✓ | | Reference to Course |
| userId | String | ✓ | | Reference to User |
| role | Enum | ✓ | | `student`, `instructor`, `ta` |
| status | Enum | ✓ | | `active`, `completed`, `dropped` |
| enrolledAt | DateTime | ✓ | | Enrollment date |
| completedAt | DateTime | | | Course completion date |

**Unique Constraint:** `(courseId, userId)` — one enrollment per user per course

**Example:**
```json
{
  "id": "enroll-1",
  "courseId": "CS-402",
  "userId": "student1",
  "role": "student",
  "status": "active",
  "enrolledAt": "2026-01-20T08:00:00Z"
}
```

---

### 4. Modules
Organizes course content by week, topic, or unit.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Module identifier |
| courseId | String | ✓ | | Reference to Course |
| title | String | ✓ | | Module name (e.g., "Week 1: Introduction") |
| description | String | | | Module overview |
| order | Integer | ✓ | | Display order within course |
| startDate | DateTime | ✓ | | Module start date |
| endDate | DateTime | ✓ | | Module end date |
| isOpen | Boolean | ✓ | | Whether module is accessible |
| createdAt | DateTime | ✓ | | Creation timestamp |

**Example:**
```json
{
  "id": "mod-cs402-01",
  "courseId": "CS-402",
  "title": "Week 1: Introduction & Setup",
  "order": 1,
  "startDate": "2026-05-04T00:00:00Z",
  "endDate": "2026-05-11T23:59:59Z",
  "isOpen": true,
  "createdAt": "2026-01-15T10:00:00Z"
}
```

---

### 5. Lessons / Learning Materials
Represents individual learning resources within modules.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Lesson identifier |
| moduleId | String | ✓ | | Reference to Module |
| title | String | ✓ | | Lesson title |
| content | String | | | Lesson body/HTML content |
| type | Enum | ✓ | | `text`, `pdf`, `video`, `link`, `assignment` |
| fileURL | String | | | URL to resource (if file-based) |
| order | Integer | ✓ | | Display order within module |
| createdAt | DateTime | ✓ | | Creation timestamp |

**Example:**
```json
{
  "id": "lesson-mod01-01",
  "moduleId": "mod-cs402-01",
  "title": "Development Environment Setup",
  "type": "video",
  "fileURL": "https://videos.university.edu/cs402/lesson1.mp4",
  "order": 1,
  "createdAt": "2026-01-15T10:00:00Z"
}
```

---

### 6. Assignments
Defines coursework and activities.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Assignment identifier |
| courseId | String | ✓ | | Reference to Course |
| moduleId | String | | | Reference to Module (optional) |
| title | String | ✓ | | Assignment title |
| description | String | | | Detailed instructions |
| assignmentType | Enum | ✓ | | `project`, `essay`, `quiz`, `homework`, `exam` |
| dueDate | DateTime | ✓ | | Submission deadline |
| maxScore | Integer | ✓ | | Total points |
| rubric | Object | | | Grading rubric (optional JSON) |
| attachments | Array | | | Resource files for assignment |
| createdAt | DateTime | ✓ | | Creation timestamp |

**Example:**
```json
{
  "id": "assign-cs402-01",
  "courseId": "CS-402",
  "moduleId": "mod-cs402-02",
  "title": "Design Database Schema",
  "description": "Design a normalized database schema for an e-commerce platform.",
  "assignmentType": "project",
  "dueDate": "2026-05-10T23:59:59Z",
  "maxScore": 100,
  "createdAt": "2026-01-20T10:00:00Z"
}
```

---

### 7. Assignment Submissions
Tracks student submissions with version control.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Submission identifier |
| assignmentId | String | ✓ | | Reference to Assignment |
| studentId | String | ✓ | | Reference to Student User |
| fileURL | String | | | Uploaded file URL |
| version | Integer | ✓ | | Version number (incremental) |
| status | Enum | ✓ | | `draft`, `submitted`, `graded`, `returned` |
| score | Integer | | | Points earned (nullable until graded) |
| feedback | String | | | Instructor feedback/remarks |
| submittedAt | DateTime | | | Submission timestamp |
| gradedBy | String | | | Reference to Grading Instructor |
| gradedAt | DateTime | | | Grading timestamp |

**Unique Constraint:** `(assignmentId, studentId, version)` — one submission per version per student

**Example:**
```json
{
  "id": "sub-assign01-student1-v1",
  "assignmentId": "assign-cs402-01",
  "studentId": "student1",
  "fileURL": "https://storage.university.edu/submissions/student1/assign1_v1.pdf",
  "version": 1,
  "status": "submitted",
  "submittedAt": "2026-05-08T15:30:00Z",
  "gradedBy": "sarah1",
  "gradedAt": "2026-05-09T10:00:00Z",
  "score": 92,
  "feedback": "Strong schema design. Minor normalization issue in table 3."
}
```

---

### 8. Timeline / Milestones
Manages course schedules, deadlines, and key dates.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Timeline entry identifier |
| courseId | String | ✓ | | Reference to Course |
| title | String | ✓ | | Event title |
| description | String | | | Event details |
| type | Enum | ✓ | | `deadline`, `module`, `exam`, `lecture`, `event` |
| startDate | DateTime | ✓ | | Event start date/time |
| endDate | DateTime | | | Event end date/time (if applicable) |
| isActive | Boolean | ✓ | | Whether event is current/visible |
| createdAt | DateTime | ✓ | | Creation timestamp |

**Example:**
```json
{
  "id": "timeline-cs402-01",
  "courseId": "CS-402",
  "title": "Assignment 1 Due: Database Schema",
  "type": "deadline",
  "startDate": "2026-05-10T23:59:59Z",
  "isActive": true,
  "createdAt": "2026-01-20T10:00:00Z"
}
```

---

### 9. Concerns / Support System
Structured feedback and issue reporting.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | String | ✓ | ✓ | Concern identifier |
| userId | String | | | Reference to User (nullable for anonymous) |
| courseId | String | ✓ | | Reference to Course |
| title | String | ✓ | | Concern title |
| message | String | ✓ | | Detailed message |
| category | Enum | ✓ | | `instructor`, `grading`, `system`, `content`, `other` |
| isAnonymous | Boolean | ✓ | | Whether submitted anonymously |
| priority | Enum | ✓ | | `low`, `medium`, `high` |
| status | Enum | ✓ | | `open`, `in_review`, `resolved`, `closed` |
| adminReply | String | | | Response from admin/instructor |
| assignedTo | String | | | Reference to Admin/Instructor handling |
| createdAt | DateTime | ✓ | | Submission timestamp |
| resolvedAt | DateTime | | | Resolution timestamp |

**Example:**
```json
{
  "id": "concern-1",
  "userId": "student1",
  "courseId": "CS-402",
  "title": "Unable to upload assignment file",
  "message": "The upload button returns an error after selecting a file.",
  "category": "system",
  "isAnonymous": false,
  "priority": "high",
  "status": "open",
  "createdAt": "2026-05-02T14:00:00Z"
}
```

---

## 🔗 Relationships & Entity-Relationship Diagram (ERD)

### Relationships

```
User (1) ←→ (*) Enrollment
Enrollment ←→ Course (1)
Course (1) ←→ (*) Module
Module (1) ←→ (*) Lesson
Course (1) ←→ (*) Assignment
Assignment (1) ←→ (*) Submission
User (1) ← Student in Submission
User (1) ← Instructor/Grader
Course (1) ←→ (*) Timeline
User (1) ←→ (*) Concern
Course (1) ←→ (*) Concern
```

### Relationship Details

| Relationship | Type | Cascade | Notes |
|-------------|------|---------|-------|
| User → Enrollment | 1:N | Soft Delete | User can enroll in multiple courses |
| Course → Module | 1:N | Cascade Delete | Modules belong to one course |
| Module → Lesson | 1:N | Cascade Delete | Lessons belong to one module |
| Course → Assignment | 1:N | Cascade Delete | Assignments belong to one course |
| Assignment → Submission | 1:N | Cascade Delete | Multiple submissions per assignment per student |
| Course → Timeline | 1:N | Cascade Delete | Timeline events linked to course |
| User → Concern | N:1 | Soft Delete | User can submit multiple concerns |
| Course → Concern | 1:N | Cascade Delete | Concerns linked to course context |

---

## 📋 Constraints & Validations

### Domain Constraints
- **Email uniqueness:** All user emails must be unique
- **Enrollment uniqueness:** One enrollment record per (course, user) pair
- **Course code uniqueness:** Course codes must be globally unique
- **Module order:** Order must be unique within a course
- **Lesson order:** Order must be unique within a module
- **Submission version:** Version numbers increment sequentially per (assignment, student)

### Business Rules
- Students cannot grade submissions (instructor/admin only)
- Submissions cannot have scores without a gradedBy reference
- Graded submissions must have gradedAt timestamp
- Timeline dates: startDate < endDate (if endDate exists)
- Modules: startDate < endDate and linked to valid course
- Anonymous concerns cannot have identifying information in message

### Status Workflows

**Submission Status:**
```
draft → submitted → graded / returned → submitted → graded
```

**Concern Status:**
```
open → in_review → resolved / closed
```

**Module Status:**
```
not_started → open / ongoing → closed
```

---

## 🔐 Access Control Matrix

| Role | Users | Courses | Enrollments | Assignments | Submissions | Timeline | Concerns |
|------|-------|---------|-------------|-------------|-------------|----------|----------|
| Admin | CRUD | CRUD | CRUD | CRUD | R | CRUD | CRUD |
| Academic Admin | R | CRUD | R | CRUD | R | CRUD | R |
| Instructor | R | Own | R | Own | CRUD | R,Own | R,Own |
| Student | Own | R | R | R | Own | R | CRUD Own |
| Counselor | R | R | R | R | R | R | CRUD |
| Student Assistant | R | R | R | R | R | R | CRUD Own |

**Legend:** C=Create, R=Read, U=Update, D=Delete

---

## 📊 Indexing Strategy

### Primary Indexes
- `users.id` — primary key
- `courses.id` — primary key
- `enrollments.(courseId, userId)` — compound unique
- `modules.courseId` + `modules.order` — course module ordering
- `assignments.courseId` — filter by course
- `submissions.(assignmentId, studentId, version)` — compound unique
- `concerns.courseId` + `concerns.status` — filter and report

### Secondary Indexes (for Query Performance)
- `enrollments.userId` — find student's courses
- `submissions.studentId` — find student's submissions
- `submissions.gradedBy` — find submissions graded by instructor
- `concerns.status` — filter by resolution status
- `timeline.courseId` + `timeline.startDate` — chronological course events

---

## 🗄️ Data Example (Sample Records)

### Users
```json
[
  {
    "id": "sarah1",
    "name": "Dr. Sarah Jenkins",
    "email": "s.jenkins@university.edu",
    "role": "instructor",
    "department": "Computer Science"
  },
  {
    "id": "student1",
    "name": "Michael Torres",
    "email": "m.torres@university.edu",
    "role": "student",
    "gpa": 3.72,
    "major": "Computer Science",
    "year": 4
  }
]
```

### Courses
```json
[
  {
    "id": "CS-402",
    "title": "Advanced Web Systems",
    "code": "CS-402",
    "instructorId": "sarah1",
    "department": "Computer Science",
    "credits": 3
  }
]
```

### Modules
```json
[
  {
    "id": "mod-cs402-01",
    "courseId": "CS-402",
    "title": "Week 1: Introduction & Setup",
    "order": 1,
    "startDate": "2026-05-04T00:00:00Z",
    "endDate": "2026-05-11T23:59:59Z"
  }
]
```

### Assignments
```json
[
  {
    "id": "assign-cs402-01",
    "courseId": "CS-402",
    "moduleId": "mod-cs402-02",
    "title": "Design Database Schema",
    "assignmentType": "project",
    "dueDate": "2026-05-10T23:59:59Z",
    "maxScore": 100
  }
]
```

### Submissions
```json
[
  {
    "id": "sub-assign01-student1-v2",
    "assignmentId": "assign-cs402-01",
    "studentId": "student1",
    "version": 2,
    "status": "graded",
    "score": 92,
    "gradedBy": "sarah1",
    "gradedAt": "2026-05-09T10:00:00Z",
    "feedback": "Excellent work. Minor formatting refinement."
  }
]
```

---

## 🛠️ Implementation Notes

### Frontend (Current Mock Implementation)
- Data stored in JavaScript objects
- No persistence layer
- Client-side routing and state management

### Backend (Future Implementation)
- Recommended: PostgreSQL for relational integrity
- Alternative: MongoDB with careful schema validation
- Authentication: JWT or session-based
- API: RESTful endpoints or GraphQL

### Migration Path
1. Current: Mock data in JavaScript (UI validation)
2. Next: Backend API with database
3. Final: Full persistence, authentication, audit logging

---

## 📝 Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-04 | Initial schema design aligned with LMS requirements |

