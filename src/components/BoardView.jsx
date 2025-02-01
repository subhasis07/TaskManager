import TaskList from "./TaskList";
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from "../utils/firebase";
// import { useEffect, useState } from "react";

const BoardView = ({tasks,taskCounts, deleteTask, modifyTask}) => {
    const categories = ["Todo", "In Progress", "Completed"];

    // const[tasks,setTasks]=useState([]);
    // useEffect(()=>{
    //   const q=query(collection(db,"tasks"));
    //   const unsubscribe=onSnapshot(q,(snapshot)=>{
    //     const fetchedTasks=snapshot.docs.map(doc=>({
    //       id:doc.id,
    //       ...doc.data()
    //     }))
    //     setTasks(fetchedTasks);
    //   })

    //   return ()=> unsubscribe();
    // })
    return (
      <div className="grid grid-cols-3 gap-4">
        {categories.map((status, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">{status} : {taskCounts[status]}</h3>

            {/* Filter tasks based on status and render TaskList */}
            {tasks.filter(task => task.status === status).length > 0 ? (
              <TaskList tasks={tasks.filter(task => task.status === status)} deleteTask={deleteTask} 
              modifyTask={modifyTask} />
            ) : (
              <div className="border-t p-4 text-gray-500">No tasks in {status}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default BoardView