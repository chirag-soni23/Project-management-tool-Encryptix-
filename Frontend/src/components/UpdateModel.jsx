import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2';
import axios from 'axios';

function UpdateModel({project,onClose,onUpdate}) {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [deadline,setDeadline] = useState('');

    useEffect(()=>{
        if(project){
            setName(project.name);
            setDescription(project.description);
            setDeadline(project.deadline);
        }

    },[project]);

    // Handle Date Change
    const todayDate = new Date().toISOString().split('T')[0];
    const handleDateChange = (e) =>{
        const selectedDate = e.target.value;
        if(new Date(selectedDate) < new Date(todayDate)){
            swal.fire({
                icon:"error",
                title:"Invaild Date",
                text:"Please Select a future date."
                
            })
            return;
        }
        setDeadline(selectedDate);
    }

    // Update Project
    const handleUpdate = async () =>{
        if(!name.trim() || !description.trim() || !deadline){
            swal.fire({
                icon:"error",
                title:"Missing Field",
                text:"All fields are required" 
            });
            return;
        };
        try {
            await axios.put(`http://localhost:5000/api/projects/${project._id}`,{name,description,deadline});
            onUpdate();
            onClose();
            swal.fire({
                icon:"success",
                title:"Project Updated",
                text:"The Project has been updated successfully."
            })
            
        } catch (error) {
            swal.fire({
                icon:"error",
                title:"Error",
                text:"There was an error updating the project."
            });
            console.error(`Error Updating Project: ${error}`);
            
        }

    }
  return (
    <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">Update Project</h2>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Enter Project Name:</label>
            <input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Enter Description:</label>
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Deadline Date:</label>
            <input
                type="date"
                value={deadline}
                min={todayDate}
                onChange={handleDateChange}
                className="border p-2 w-full"
            />
        </div>
        <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-2 rounded mr-2"
        >
            Update
        </button>
        <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded"
        >
            Cancel
        </button>
    </div>
</div>
);

}

export default UpdateModel
