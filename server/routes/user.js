const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Course } = require("../database");
const { SECRET1 } = require("../middleware/userAuth");
const { authenticateJwtUser } = require("../middleware/userAuth");

const router = express.Router();


// User routes
router.post('/signup', async (req, res) => {
    // logic to sign up user
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(user) {
      res.status(403).json({message: 'User already exists' });
    }
    else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET1, {expiresIn: '1h' });
      res.json({message: 'User created successfully', token });
    }
});
  
router.post('/login', async (req, res) => {
    // logic to log in user
    const { username,  password } = req.headers;
    const user = await User.findOne({username, password});
    if(user) {
      const token = jwt.sign({username, role: 'user'}, SECRET1, {expiresIn: '1h' });
      res.json({message: 'Logged in successfully', token});
    } else {
      res.status(403).json({message: 'Invalid username or password' });
    }
});
  
router.get('/courses', authenticateJwtUser, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({published: true});
    res.json({ courses });
});
  
router.post('/courses/:courseId', authenticateJwtUser, async (req, res) => {
    // logic to purchase a course
    const course = await Course.findById(req.params.courseId);
    if(course) {
      const user = await User.findOne({ username: req.user.username });
      if(user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({message: 'Course purchased successfully', });
      } else {
        res.status(404).json({message: 'User not found'});
      }
    } else {
      res.status(404).json({message: 'Course not found' });
    }
});
  
router.get('/purchasedCourses', authenticateJwtUser, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username: req.user.username}).populate('pusrchasedCourses');
    if(user) {
      res.json({ purchasedCourses: user.purchasedCourses || []});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router