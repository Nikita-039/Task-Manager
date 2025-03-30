const asyncHandler = require("express-async-handler");
const Task = require("../models/Task"); // Corrected import

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// @desc    Add new task
// @route   POST /api/tasks
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const task = await Task.create({
    user: req.user.id,
    name,
    description,
    status: status || "pending",
  });
  res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  await task.deleteOne();
  res.json({ message: "Task deleted" });
});

module.exports = { getTasks, addTask, updateTask, deleteTask };

