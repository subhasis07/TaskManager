import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const TaskList = ({ tasks, deleteTask, modifyTask }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditedTitle(task.title);
    setOpenMenuId(null);
  };

  const handleSave = (taskId) => {
    modifyTask(taskId, { title: editedTitle });
    setEditTaskId(null);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between border-b py-2"
        >
          {/* ✅ Checkbox */}
          <input type="checkbox" className="mr-3 cursor-pointer" />

          {/* ✏️ Editable Task Title */}
          {editTaskId === task.id ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border p-1 rounded w-2/3"
            />
          ) : (
            <span className="flex-1">{task.title}</span>
          )}

          {/* 🎯 Three Dot Menu */}
          <div className="relative">
            <button className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() =>
              setOpenMenuId(openMenuId === task.id ? null : task.id)
            }>
              <FaEllipsisV />
            </button>
            {openMenuId === task.id && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-2 w-28">
                <button
                  className="block w-full text-left px-3 py-1 hover:bg-gray-200"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-3 py-1 text-red-500 hover:bg-red-100"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
              )}
          </div>
    
          {/* ✅ Save Button for Editing */}
          {editTaskId === task.id && (
            <button
              className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleSave(task.id)}
            >
              Save
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
