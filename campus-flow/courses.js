const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: { select: { name: true, avatar: true } }
      }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// POST create a course (Admin/Academic Admin only)
router.post('/', async (req, res) => {
  const { id, title, instructorId, department, code } = req.body;
  try {
    const newCourse = await prisma.course.create({
      data: { id, title, instructorId, department, code }
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: 'Course creation failed', details: error.message });
  }
});

module.exports = router;