import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2';
import axios from 'axios';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    // HandleDateChange
    const todayDate = new Date().toISOString().split('T')[0];
    const handleDatechange = (e) => {
        const selectedDate = e.target.value;
        if (new Date(selectedDate) < new Date(todayDate)) {
            swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Please select a future date.',
            });
            return;
        }
        setDeadline(selectedDate);
    }

    // Fetch Projects
    useEffect(() => {
        const fetchProjects = async () => {
            const result = await axios.get('http://localhost:5000/api/projects/');
            setProjects(result.data);
        }
        fetchProjects();
    }, []);


    // Create Project
    const createProject = async () => {
        if (!name.trim() || !description.trim() || !deadline) {
            swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'All fields are required',
            });
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/projects', { name, description, deadline });
            setName('');
            setDescription('');
            setDeadline('');
            const result = await axios.get('http://localhost:5000/api/projects/');
            setProjects(result.data);
            swal.fire({
                icon: 'success',
                title: 'Project Created',
                text: 'The project has been created successfully.',
            });

        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error creating the project.',
            });
            console.error('Error creating project:', error);
        }

    }


    // Delete Project
    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
            const result = await axios.get('http://localhost:5000/api/projects');
            setProjects(result.data);
            swal.fire({
                icon: 'success',
                title: 'Project Deleted',
                text: 'The project has been deleted successfully.',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error deleting the project.',
            });
            console.error('Error deleting project:', error);
        }
    }


    // Progress Bar
    const calculateProgress = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const total = end - now;
        const start = new Date(end.getFullYear(), 0, 1); 
        const yearTotal = end - start;
        const progress = ((yearTotal - total) / yearTotal) * 100;
        return Math.max(0, Math.min(100, progress));
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Project Management Tool</h1>
            <div className=" mb-4">
                <div className="flex items-center mb-2">
                    <label className="mr-2 text-sm font-medium">Enter Project Name:</label>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full max-w-xs"
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label className="mr-2 text-sm font-medium">Enter Description:</label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full max-w-xs"
                    />
                </div>
                <div className="flex gap-2 items-center mb-4">
                    <label className="mr-2 text-sm font-medium">Select Deadline Date:</label>
                    <input
                        type="date"
                        value={deadline}
                        min={todayDate}
                        onChange={handleDatechange}
                        className="border p-2"
                    />
                <button
                    onClick={createProject}
                    className="bg-blue-500  text-white p-2 rounded"
                >
                    Add Project
                </button>
                </div>


            </div>
            <ul>
                {projects.length > 0 ? projects.map((project) => (
                    <li key={project._id} className="mb-4 p-4 border rounded">
                        <h2 className="mb-2 text-xl font-semibold"><b className='text-gray-500'>Name:</b> {project.name}</h2>
                        <p className='mb-2'><b className='text-gray-500'>Description:</b> {project.description}</p>
                        <p className="text-gray-500 mb-2"><b>Deadline:</b> {new Date(project.deadline).toLocaleDateString()}</p>
                        <div className="mt-2">
                            <div className="relative pt-1">
                                <button
                                    onClick={() => deleteProject(project._id)}
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
                )) : <h1 className='tracking-tighter text-2xl'>No Project Here 📁 📁</h1>}
            </ul>
        </div>
    );
}

export default ProjectList;