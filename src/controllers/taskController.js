import Task from "../models/Task.js";



// CREATE TASK

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      owner: req.user._id,
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET USER TASKS

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};



// DELETE TASK

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({
      _id: taskId,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};