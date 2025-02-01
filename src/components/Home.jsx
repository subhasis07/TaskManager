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

  const taskCounts = tasks.reduce(
    (counts, task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
      return counts;
    },
    { Todo: 0, "In Progress": 0, Completed: 0 }
  );

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  
  const modifyTask = (taskId, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)));
  };

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
        {view === "list" ?
         <ListView tasks={filteredTasks} taskCounts={taskCounts} deleteTask={deleteTask} 
         modifyTask={modifyTask} /> 
         : 
         <BoardView tasks={filteredTasks} taskCounts={taskCounts} deleteTask={deleteTask} 
         modifyTask={modifyTask} />}
      </div>
      {isModalOpen && <AddTaskModal onClose={()=>setIsModelOpen(false)} addTask={addTask} taskCounts={taskCounts} />}
    </div>
  );
};


export default Home;



////--- need to check firebase DB
















// import React, { useEffect, useState } from "react";
// import { FaSearch, FaSignOutAlt, FaPlus } from "react-icons/fa";
// import { IoGridOutline, IoListOutline } from "react-icons/io5";
// import { auth, db } from "../utils/firebase";
// import { signOut } from "firebase/auth";
// import { collection, getDocs } from "firebase/firestore";
// import ListView from "./ListView";
// import BoardView from "./BoardView";
// import AddTaskModal from "./AddTaskModal";

// const Home = () => {
//   const [view, setView] = useState("list");
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const user = auth.currentUser;

//   // Function to handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   // Function to fetch tasks from Firestore
//   const fetchTasks = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "tasks"));
//       const taskList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setTasks(taskList);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Fetch tasks when component mounts
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const addTask = (newTask) => {
//     setTasks((prevTasks) => [...prevTasks, newTask]);
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white shadow-md p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">TaskBuddy</h1>
        
//         {/* Search Input */}
//         <div className="flex items-center border rounded-lg overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             className="px-3 py-2 outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FaSearch className="mx-3 text-gray-600" />
//         </div>

//         {/* Profile & Logout */}
//         <div className="flex flex-col items-center">
//           <div className="flex items-center gap-3">
//             <img
//               src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
//               alt="User"
//               className="w-10 h-10 rounded-full border"
//             />
//             <div className="text-gray-700 font-medium">{user?.displayName}</div>
//           </div>
//           <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 mt-2">
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Controls: View Toggle & Add Task */}
//       <div className="p-4 flex justify-between items-center">
//         {/* View Toggle */}
//         <div className="flex gap-2">
//           <button
//             className={`px-4 py-2 rounded-lg flex items-center gap-2 ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
//             onClick={() => setView("list")}
//           >
//             <IoListOutline className="text-lg" /> List View
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg flex items-center gap-2 ${view === "board" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
//             onClick={() => setView("board")}
//           >
//             <IoGridOutline className="text-lg" /> Board View
//           </button>
//         </div>

//         {/* Add Task Button */}
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <FaPlus /> Add Task
//         </button>
//       </div>

//       {/* Task View */}
//       <div className="p-4">
//         {view === "list" ? <ListView tasks={filteredTasks} /> : <BoardView tasks={filteredTasks} />}
//       </div>

//       {/* Add Task Modal */}
//       {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} addTask={addTask} />}
//     </div>
//   );
// };

// export default Home;
