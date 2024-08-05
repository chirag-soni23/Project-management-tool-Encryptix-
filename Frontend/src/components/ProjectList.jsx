import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ProjectList({ onSelectProject }) {
    const [projects,setProjects] = useState([]);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [deadline,setDeadline] = useState('');

    useEffect(()=>{
        const fetchProjects = async ()=>{
            const result = await axios.get('http://localhost:5000/api/projects/');
            setProjects(result.data);
        }
        fetchProjects();
    },[]);

    // Create Project
    const createProject = async () =>{
        await axios.post('http://localhost:5000/api/projects',{name,description,deadline});
        setName('');
        setDescription('');
        setDeadline('');
        const result = await axios.get('http://localhost:5000/api/projects/');
        setProjects(result.data);
    }
    // Delete Project
    const deleteProject = async (projectId)=>{
        try {
            await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
            const result = await axios.get('http://localhost:5000/api/projects');
            setProjects(result.data);
            onSelectProject(null);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }
    const calculateProgress = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const total = end - now;
        const progress = (total / (end - new Date(end.getFullYear(), 0, 1))) * 100;
        return Math.max(0, Math.min(100, progress));
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Project Management Tool</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={createProject}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Project
                </button>
               
            </div>
            <ul>
                {projects.map((project) => (
                    <li key={project._id} className="mb-4 p-4 border rounded">
                        <h2 className="text-xl font-semibold">{project.name}</h2>
                        <p>{project.description}</p>
                        <p className="text-gray-500">{new Date(project.deadline).toLocaleDateString()}</p>
                        <div className="mt-2">
                            <div className="relative pt-1">
                                <button
                    onClick={()=>deleteProject(project._id)}
                    className="bg-red-500 mb-2 text-white p-1 rounded"
                >
                    Delete Project
                </button>
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                                        Progress
                                    </div>
                                    <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                                        {calculateProgress(project.deadline).toFixed(2)}%
                                    </div>
                                </div>
                                <div className="flex">
                                    <div
                                        className="bg-teal-600 text-xs leading-none py-1 text-center text-white rounded"
                                        style={{ width: `${calculateProgress(project.deadline)}%` }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList
