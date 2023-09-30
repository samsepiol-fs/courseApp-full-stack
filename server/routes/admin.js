const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Admin, Course } = require("../database");
const { SECRET } = require("../middleware/adminAuth");
const { authenticateJwt } = require("../middleware/adminAuth");

const router = express.Router();

// Admin routes
router.post('/signup', async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if(admin) {
    res.status(403).json({message: 'Admin already exists' });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({username, role: 'admin'} , SECRET, {expiresIn: '1h'});
    res.json({ message: 'Admin created successfully', token });
  }
});
  
router.post('/login', async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if(admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, {expiresIn: '1h' });
      res.json({ message: 'Logged in successfully' , token});
  } else {
      res.status(403).json({ message: 'Invalid username or password' });
  }
});
  
router.get('/profile', authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username })
  if(!admin) {
    res.status(403).json({message: "Admin doesn't exist"});
    return
  }
  res.json({
    username: admin.username
  })
});
  
router.post('/courses', authenticateJwt,  async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({message: 'Course created successfully', courseId: course.id});
});
  
router.put('/courses/:courseId', authenticateJwt, async(req, res) => {
    // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
  if(course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});
  
router.get('/courses', authenticateJwt,  async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
  const cousrseId = req.params.courseId;
  const course = await Course.findById(cousrseId);
  res.json({course});
});

module.exports = router