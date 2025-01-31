import TaskList from "./TaskList";

const BoardView = ({ tasks }) => {
    const categories = ["Todo", "InProgress", "Completed"];
  
    return (
      <div className="grid grid-cols-3 gap-4">
        {categories.map((status, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">{status}</h3>

            {/* Filter tasks based on status and render TaskList */}
            {tasks.filter(task => task.status === status).length > 0 ? (
              <TaskList tasks={tasks.filter(task => task.status === status)} />
            ) : (
              <div className="border-t p-4 text-gray-500">No tasks in {status}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default BoardView