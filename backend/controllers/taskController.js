const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.project) filter.project = req.query.project;
    
    let tasks;
    if (req.user.role === 'Admin') {
      tasks = await Task.find(filter).populate('assignedTo createdBy', 'name email').populate('project', 'name');
    } else {
      const projects = await Project.find({ $or: [{ owner: req.user._id }, { members: req.user._id }] });
      const projectIds = projects.map(p => p._id);
      tasks = await Task.find({ ...filter, project: { $in: projectIds } }).populate('assignedTo createdBy', 'name email').populate('project', 'name');
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
