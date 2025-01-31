const ListView = ({ tasks }) => {
    const categories = ["Todo", "InProgress", "Completed"];
  
    return (
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-purple-600 mb-2">{category}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Task Name</th>
                  <th className="border p-2">Due Date</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.status === category)
                  .map((task) => (
                    <tr key={task.id} className="text-center">
                      <td className="border p-2">{task.name}</td>
                      <td className="border p-2">{task.dueDate}</td>
                      <td className="border p-2">{task.category}</td>
                      <td className="border p-2">{task.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
};
export default ListView