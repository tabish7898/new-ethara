const express = require('express');
const { createProject, getProjects, getProjectById, updateProject, deleteProject, addMember } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, admin, createProject)
  .get(protect, getProjects);

router.route('/:id')
  .get(protect, getProjectById)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

router.post('/:id/members', protect, admin, addMember);

module.exports = router;
