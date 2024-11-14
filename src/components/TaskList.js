// import React, { useState, useEffect } from "react";
// import Calendar from "./Calender";
// import TaskItem from "./TaskItem";
// import TaskForm from "./TaskForm";

// const TaskList = () => {
//   // dummy task
//   const initialTask = {
//     title: "hello",
//     description: "helkoo",
//     dueDate: "2024-11-15",
//     priority: "High",
//     id: 1731527300314,
//     status: "not_due",
//   };

//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [initialTask];
//   });

//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [view, setView] = useState("list");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState(""); // New state for search query

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleAddTask = (newTask) => {
//     setTasks([
//       ...tasks,
//       {
//         ...newTask,
//         id: Date.now(),
//         status: "not_due",
//       },
//     ]);
//     setShowForm(false);
//   };

//   const handleEditTask = (editedTask) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === editedTask.id
//           ? { ...editedTask, status: task.status }
//           : task
//       )
//     );
//     setTaskToEdit(null);
//     setShowForm(false);
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   const toggleTaskStatus = (taskId) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === taskId
//           ? {
//               ...task,
//               status: task.status === "completed" ? "not_due" : "completed",
//             }
//           : task
//       )
//     );
//   };

//   // Filter tasks based on priority and search query
//   const filteredTasks = tasks.filter((task) => {
//     const matchesPriority =
//       priorityFilter === "All" ? true : task.priority === priorityFilter;
//     const matchesSearchQuery = task.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());

//     return matchesPriority && matchesSearchQuery;
//   });

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
//         <div className="space-x-4 text-black">
//           <select
//             value={priorityFilter}
//             onChange={(e) => setPriorityFilter(e.target.value)}
//             className="px-4 py-2 border rounded"
//           >
//             <option value="All">All Priorities</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search by title..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-4 py-2 border rounded"
//           />
//           <button
//             onClick={() => setView(view === "list" ? "calendar" : "list")}
//             className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//           >
//             {view === "list" ? "Calendar View" : "List View"}
//           </button>
//           {!showForm && (
//             <button
//               onClick={() => setShowForm(true)}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Add New Task
//             </button>
//           )}
//         </div>
//       </div>

//       {showForm && (
//         <TaskForm
//           addTask={handleAddTask}
//           editTask={handleEditTask}
//           closeForm={() => {
//             setShowForm(false);
//             setTaskToEdit(null);
//           }}
//           taskToEdit={taskToEdit}
//         />
//       )}

//       {view === "calendar" ? (
//         <Calendar tasks={filteredTasks} toggleTaskStatus={toggleTaskStatus} />
//       ) : (
//         <div className="mt-8 space-y-4 text-black">
//           {filteredTasks.map((task) => (
//             <TaskItem
//               key={task.id}
//               task={task}
//               deleteTask={handleDeleteTask}
//               setTaskToEdit={(task) => {
//                 setTaskToEdit(task);
//                 setShowForm(true);
//               }}
//               toggleStatus={toggleTaskStatus}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskList;
import React, { useState, useEffect } from "react";
import Calendar from "./Calender";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  // dummy task
  const initialTask = {
    title: "hello",
    description: "helkoo",
    dueDate: "2024-11-15",
    priority: "High",
    id: 1731527300314,
    status: "due",
  };

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [initialTask];
  });

  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("list");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [statusFilter, setStatusFilter] = useState("All"); // New state for status filter

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: Date.now(),
        status: "due",
      },
    ]);
    setShowForm(false);
  };

  const handleEditTask = (editedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === editedTask.id
          ? { ...editedTask, status: task.status }
          : task
      )
    );
    setTaskToEdit(null);
    setShowForm(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "due" : "completed",
            }
          : task
      )
    );
  };

  // Filter tasks based on priority, status, and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === "All" ? true : task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "All" ? true : task.status === statusFilter;
    const matchesSearchQuery = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesPriority && matchesStatus && matchesSearchQuery;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
        <div className="space-x-4 text-black">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All Status</option>
            <option value="due">Due</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => setView(view === "list" ? "calendar" : "list")}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {view === "list" ? "Calendar View" : "List View"}
          </button>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add New Task
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <TaskForm
          addTask={handleAddTask}
          editTask={handleEditTask}
          closeForm={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
          taskToEdit={taskToEdit}
        />
      )}

      {view === "calendar" ? (
        <Calendar tasks={filteredTasks} toggleTaskStatus={toggleTaskStatus} />
      ) : (
        <div className="mt-8 space-y-4 text-black">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={handleDeleteTask}
              setTaskToEdit={(task) => {
                setTaskToEdit(task);
                setShowForm(true);
              }}
              toggleStatus={toggleTaskStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
