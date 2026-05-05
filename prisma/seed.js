const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const testUsers = [
  {
    id: 'admin1',
    password: 'password123',
    name: 'Administrator',
    email: 'admin@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: 'admin',
    permissions: ['view_all_users', 'manage_accounts', 'system_settings', 'reports']
  },
  {
    id: 'principal1',
    password: 'password123',
    name: 'Dr. Michael Henderson',
    email: 'principal@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'principal',
    department: 'Administration',
    permissions: ['view_all_records', 'approve_requests', 'manage_staff']
  },
  {
    id: 'academic1',
    password: 'password123',
    name: 'Dr. Patricia Williams',
    email: 'p.williams@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    role: 'academic_admin',
    department: 'Computer Science',
    permissions: ['manage_courses', 'view_department_records', 'approve_grades']
  },
  {
    id: 'course1',
    password: 'password123',
    name: 'Dr. Robert Chen',
    email: 'r.chen@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'program_coordinator',
    department: 'Computer Science',
    permissions: ['manage_course', 'grade_students', 'manage_materials']
  },
  {
    id: 'counselor1',
    password: 'password123',
    name: 'Ms. Jennifer Davis',
    email: 'j.davis@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    role: 'counselor',
    department: 'Student Services',
    permissions: ['view_student_records', 'schedule_meetings', 'view_grades']
  },
  {
    id: 'stass1',
    password: 'password123',
    name: 'Alex Morgan',
    email: 'alex.morgan@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    gpa: 3.85,
    major: 'Computer Science',
    role: 'student_assistant',
    year: 3,
    permissions: ['help_students', 'create_study_groups', 'view_course_materials']
  },
  {
    id: 'student1',
    password: 'password123',
    name: 'Michael Torres',
    email: 'm.torres@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    gpa: 3.72,
    major: 'Computer Science',
    role: 'student',
    year: 4,
    permissions: ['view_grades', 'submit_assignments', 'view_messages']
  },
  {
    id: 'student2',
    password: 'password123',
    name: 'Jordan Smith',
    email: 'jordan.smith@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    gpa: 3.95,
    major: 'Computer Science',
    role: 'student',
    year: 4,
    permissions: ['view_grades', 'submit_assignments', 'view_messages']
  },
  {
    id: 'student3',
    password: 'password123',
    name: 'Casey Brown',
    email: 'casey.brown@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
    gpa: 3.6,
    major: 'Computer Science',
    role: 'student',
    year: 3,
    permissions: ['view_grades', 'submit_assignments', 'view_messages']
  },
  {
    id: 'sarah1',
    password: 'password123',
    name: 'Dr. Sarah Johnson',
    email: 's.johnson@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'instructor',
    department: 'Computer Science',
    permissions: ['manage_course', 'grade_students', 'manage_materials']
  }
];

async function main() {
  console.log('Seeding database...');

  for (const userData of testUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await prisma.user.upsert({
      where: { id: userData.id },
      update: {},
      create: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        department: userData.department,
        avatar: userData.avatar,
        gpa: userData.gpa,
        major: userData.major,
        year: userData.year,
        permissions: JSON.stringify(userData.permissions)
      }
    });

    console.log(`Created user: ${userData.name} (${userData.role})`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });