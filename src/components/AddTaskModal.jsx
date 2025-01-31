import React, { useState } from 'react'

const AddTaskModal = ({onClose, addTask}) => {

    // const[taskTitle, setTaskTitle]=useState("");
    // const[description, setDescription]=useState("");
    // const[category, setCategory]=useState("work");
    // const[dueDate, setDueDate]=useState("");
    // const[status, setStatus]=useState("");
    // const[attachment, setAttachment]=useState(null);
  

    const [task, setTask] = useState({ name: "", dueDate: "", category: "Work", status: "Todo" });
    
    const handleChange=(e)=>{
        setTask({...task, [e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        addTask(task);
        onClose()
    }



    return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className="text-xl font-semibold">Create Task</h2>
        
            <form 
                onSubmit={handleSubmit}
                className='flex flex-col gap-3'>
                <input 
                    type="text"
                    className='w-full p-2 mt-3 border rounded-md'
                    placeholder='Task Title'
                    name='name'
                    value={task.name}
                    onChange={handleChange}
                />
                <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="border p-2 rounded" required />
                <select name="category" value={task.category} onChange={handleChange} className="border p-2 rounded">
                    <option>Work</option>
                    <option>Personal</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            </form>

                <button onClick={onClose} className="mt-2 text-gray-500">Cancel</button>

                {/* <div >
                    <button
                        type='button'
                            
                    >
                        Work
                    </button>
                    <button
                        type='button'

                    >
                        Personal
                    </button>
                </div>

                <div>
                    <label>Due On*</label>
                    <input
                        type='date'
                        className="w-full p-2 mt-1 border rounded-md"
                    />
                </div> */}

                {/* <div>
                    <label>Task Status*</label>
                    <select
                        className="w-full p-2 mt-1 border rounded-md"
                    >
                        <option>choose</option>
                        <option>ToDo</option>
                        <option>InProgress</option>
                        <option>Completed</option>
                    </select>
                </div> */}

                {/* <div>
                    <label>Attachment</label>
                    <input
                        type='file'
                        className="w-full p-2 mt-1 border rounded-md"
                    />
                </div> */}

            
        </div>
    </div>
  )
}

export default AddTaskModal