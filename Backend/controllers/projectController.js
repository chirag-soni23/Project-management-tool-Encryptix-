const Project = require('../models/projectModel.js')

// Get Projects
const getProject = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create Project
const createProject = async (req, res) => {
    try {
        const { name, description, deadline } = req.body;
        const project = new Project({ name, description, deadline });
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Project
const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, description, deadline } = req.body;

        const project = await Project.findByIdAndUpdate(
            projectId,
            { name, description, deadline },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports =  { getProject, createProject, deleteProject, updateProject };
