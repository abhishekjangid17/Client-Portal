const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createProject, getProjects, getProject, updateProject, deleteProject
} = require('../controllers/projectController');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

// Project routes
router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.get('/:id', auth, getProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

// Task routes (nested under project)
router.post('/:projectId/tasks', auth, createTask);
router.get('/:projectId/tasks', auth, getTasks);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);

module.exports = router;