import Task from "../models/taskModels";

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

export const getTask = async(req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
};

