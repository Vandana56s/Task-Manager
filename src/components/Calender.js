import React from "react";

const Calendar = ({ tasks, toggleTaskStatus }) => {
  console.log("inside calender");
  const tasksByDate = tasks.reduce((acc, task) => {
    const dueDate = new Date(task.dueDate).toLocaleDateString();
    if (!acc[dueDate]) acc[dueDate] = [];
    acc[dueDate].push(task);
    return acc;
  }, {});

  const getStatusColor = (status, priority) => {
    if (status === "completed") return "bg-green-100";
    if (priority === "High") return "bg-red-50";
    if (priority === "Medium") return "bg-yellow-50";
    return "bg-white";
  };

  const getStatusBadge = (status) => {
    return status === "completed" ? (
      <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
        Completed
      </span>
    ) : (
      <span className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
        Due
      </span>
    );
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks Calendar</h2>
      <div className="space-y-6">
        {Object.keys(tasksByDate)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date) => (
            <div key={date} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {date}
              </h3>
              <ul className="space-y-3">
                {tasksByDate[date].map((task) => (
                  <li key={task.id}>
                    <div
                      className={`p-4 rounded-lg shadow-sm transition-all duration-200 ${getStatusColor(
                        task.status,
                        task.priority
                      )} hover:shadow-md`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {task.title}
                        </h4>
                        <div className="flex space-x-2 items-center">
                          <span
                            className={`px-2 py-1 text-sm rounded-full ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.priority}
                          </span>
                          {getStatusBadge(task.status)}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            task.status === "completed"
                              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {task.status === "completed"
                            ? "Mark  Due"
                            : "Mark Complete"}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Calendar;
