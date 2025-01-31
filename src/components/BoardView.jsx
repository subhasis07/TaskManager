const BoardView = ({ tasks }) => {
    const categories = ["Todo", "InProgress", "Completed"];
  
    return (
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-purple-600 mb-2">{category}</h2>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === category)
                .map((task) => (
                  <div key={task.id} className="p-3 bg-gray-100 rounded-md shadow-sm">
                    <h3 className="font-medium">{task.name}</h3>
                    <p className="text-sm text-gray-500">📅 {task.dueDate}</p>
                    <p className="text-sm text-gray-500">🏷️ {task.category}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default BoardView