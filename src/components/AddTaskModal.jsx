import React, { useState } from "react";

const AddTaskModal = ({ onClose, addTask,taskCounts }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Work",
    status: "Todo",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFileChange = (e) => {
    setTaskData({ ...taskData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.dueDate) {
      alert("Title and Due Date are required!");
      return;
    }
    addTask(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Task Title */}
          <label className="font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            placeholder="Enter task title..."
          />

          {/* Description */}
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Enter task details..."
          />

          {/* Due Date */}
          <label className="font-medium">Due Date *</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          {/* Category */}
          <label className="font-medium">Category</label>
          <select
            name="category"
            value={taskData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          {/* Status */}
          <label className="font-medium">Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="border p-2 rounded"
            >
            <option value="Todo">Todo ({taskCounts["Todo"]})</option>
            <option value="In Progress">In Progress ({taskCounts["In Progress"]})</option>
            <option value="Completed">Completed ({taskCounts["Completed"]})</option>
        </select>

          {/* File Attachment */}
          <label className="font-medium">Attachment</label>
          <input type="file" onChange={handleFileChange} className="border p-2 rounded" />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-violet-600 text-white px-4 py-2 rounded">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
