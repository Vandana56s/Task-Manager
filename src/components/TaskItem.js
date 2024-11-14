const TaskItem = ({ task, deleteTask, setTaskToEdit, toggleStatus }) => (
  <div
    className={`p-4 rounded shadow transition-all duration-200 ${
      task.status === "completed" ? "bg-green-50" : "bg-white"
    } hover:shadow-md`}
  >
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority}
          </span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              task.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {task.status === "completed" ? "Completed" : "Due"}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          onClick={() => setTaskToEdit(task)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              deleteTask(task.id);
            }
          }}
        >
          Delete
        </button>
        <button
          className={`px-3 py-1 rounded transition-colors ${
            task.status === "completed"
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
          onClick={() => toggleStatus(task.id)}
        >
          {task.status === "completed" ? "Due" : "Mark Complete"}
        </button>
      </div>
    </div>
  </div>
);
export default TaskItem;
