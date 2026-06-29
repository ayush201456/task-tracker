const Task = require('../models/Task');
exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) { res.status(500).json({ message: 'Server Error', error: error.message }); }
};
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title field is required' });
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (error) { res.status(400).json({ message: 'Validation failed', error: error.message }); }
};
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedTask);
  } catch (error) { res.status(400).json({ message: 'Update failed', error: error.message }); }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Task removed successfully' });
  } catch (error) { res.status(500).json({ message: 'Server Error', error: error.message }); }
};