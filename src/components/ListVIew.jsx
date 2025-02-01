import TaskList from "./TaskList";

const ListView = ({tasks, taskCounts}) => {
    const categories = ["Todo", "In Progress", "Completed"];



    return (
      <div className="flex flex-col gap-4">
        {categories.map((status, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg mt-4">
            <h3 className="font-bold text-lg mb-2">{status} : {taskCounts[status]}</h3>

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
export default ListView