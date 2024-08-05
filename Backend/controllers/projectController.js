const Project = require('../models/projectModel.js');

// Get Project
const getProject = async (req,res)=>{
    const projects = await Project.find({});
    res.json(projects);
};

// Create Project
const createProject = async (req,res)=>{
    const {name,description,deadline} = req.body;
    const project = new Project({name,description,deadline});
    const createproject = await project.save();
    res.status(201).json(createproject);
}

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const task = await Project.findByIdAndDelete(projectId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getProject,createProject,deleteProject};