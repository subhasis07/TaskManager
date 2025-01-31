import React, { useState } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import ListView from "./ListVIew";
import BoardView from "./BoardView";
import AddTaskModal from "./AddTaskModal";

const Home = () => {
  const [view, setView] = useState("list"); // "list" or "board"
  const user = auth.currentUser; // Get user info from Firebase

  const[tasks,setTasks]=useState([]);
  const[isModalOpen,setIsModelOpen]=useState(false);
  const[searchQuery, setSearchQuery] = useState("");


  // Logout Handler
  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("email");
    window.location.href = "/"; // Redirect to login
  };


  const addTask=(newTask)=>{
    setTasks([...tasks, {id:tasks.length+1, ...newTask}])
  }


  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔷 Header Navbar */}
      <div className="bg-white shadow-md p-7 flex justify-between items-center">
        <h1 className="text-2xl font-bold">TaskBuddy</h1>
        <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          <div className="text-gray-700 font-medium">{user?.displayName}</div>
        </div>

        {/* 🔹 Logout Button (Placed Below) */}
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 mt-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div>
      <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md flex items-center gap-1 ${
              view === "list" ? " text-black font-bold" : "bg-gray-200"
            }`}
            onClick={() => setView("list")}
          >
            <IoListOutline className="text-lg" /> List View
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center gap-1 ${
              view === "board" ? "text-black font-bold" : "bg-gray-200"
            }`}
            onClick={() => setView("board")}
          >
            <IoGridOutline className="text-lg" /> Board View
          </button>
        </div>
      </div>

      {/* 🔷 View Toggle */}
      <div className="flex justify-between items-center p-4 gap-3 bg-white shadow-md mt-4 mx-4 rounded-lg">
        

        {/* 🔷 Filters & Actions */}
        <div className="flex items-center gap-3">

          <h3>Filter By: </h3>

          <select className="border p-2 rounded-md">
            <option>All Categories</option>
            <option>Work</option>
            <option>Personal</option>
          </select>
          <select className="border p-2 rounded-md">
            <option>Due Date</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          </div>

          <div className="flex gap-3">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 outline-none w-full"
            />
          </div>
          <button 
            className="bg-violet-600 text-white px-4 py-2 rounded-md"
            onClick={()=>setIsModelOpen(true)}  
          >  Add Task</button>
          
        </div>
      </div>

      {/* 🔷 Content Section */}
      <div className="p-4">
        {view === "list" ? <ListView tasks={filteredTasks} /> : <BoardView tasks={filteredTasks} />}
      </div>
      {isModalOpen && <AddTaskModal onClose={()=>setIsModelOpen(false)} addTask={addTask} />}
    </div>
  );
};


export default Home;
