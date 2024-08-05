import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const result = await axios.get(`http://localhost:5000/api/tasks/${projectId}`);
            setTasks(result.data);
        };
        fetchTasks();
    }, [projectId]);

    const createTask = async () => {
        await axios.post('http://localhost:5000/api/tasks/', { projectId, name });
        setName('');
        const result = await axios.get(`http://localhost:5000/api/tasks/${projectId}`);
        setTasks(result.data);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={createTask}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Task
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="mb-2 p-2 border rounded">
                        <p>{task.name}</p>
                        <p className={`text-gray-500 ${task.completed ? 'line-through' : ''}`}>{task.completed ? 'Completed' : 'Pending'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
