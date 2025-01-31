const TaskList = ({ tasks }) => {
  return (
    <ul className="list-disc pl-5">
      {tasks.map(task => (
        <li key={task.id} className="p-2 border-b border-gray-200">
          {task.name} - Due: {task.dueDate} - Category: {task.category}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;