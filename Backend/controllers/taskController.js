const Task = require('../models/taskModel.js');

// Get Task
const getTask = async (req,res)=>{
    const tasks = await Task.find({projectId:req.params.projectId});
    res.json(tasks);
}

// Create Task
const createTask = async (req,res)=>{
    const {projectId,name} = req.body;
    const task = new Task({projectId,name});
    const createTask = await task.save();
    res.status(201).json(createTask);
}

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getTask,createTask,deleteTask};