import Task from "../models/taskModels.js";

export const createTask = async(req, res) => {
    const { title, description } = req.body;

    if(!title) return res.status(400).json({ message: "Title is required" });

 const task = await Task.create({
        user: req.user.id,
        title,
        description,
    });

    res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json(updatedTask);
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the logged-in user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne(); // or task.remove()

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("Server error in deleteTask:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTask = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const totalTasks = await Task.countDocuments({ user: req.user.id });

  const tasks = await Task.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({ tasks, totalTasks });
};





