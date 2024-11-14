// import React, { useState, useEffect } from "react";
// import TaskForm from "./TaskForm";
// import TaskList from "./TaskList";

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   // Fetch tasks from localStorage when the component mounts
//   console.log("TASK__", tasks);

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     setTasks(storedTasks);
//   }, []);
//   console.log("TASK__", tasks);
//   // Save tasks to localStorage whenever the task list is updated
//   const saveTasksToLocalStorage = (updatedTasks) => {
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

//   const addTask = (newTask) => {
//     const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
//     setTasks(updatedTasks);
//     saveTasksToLocalStorage(updatedTasks);
//   };

//   const editTask = (updatedTask) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === updatedTask.id ? updatedTask : task
//     );
//     setTasks(updatedTasks);
//     saveTasksToLocalStorage(updatedTasks);
//   };

//   const deleteTask = (taskId) => {
//     const updatedTasks = tasks.filter((task) => task.id !== taskId);
//     setTasks(updatedTasks);
//     saveTasksToLocalStorage(updatedTasks);
//   };

//   const closeForm = () => {
//     setIsFormOpen(false);
//     setTaskToEdit(null); // Reset taskToEdit when closing the form
//   };

//   return (
//     <div className="p-8">
//       <button
//         onClick={() => {
//           setIsFormOpen(true);
//           setTaskToEdit(null); // Reset editing task when adding a new task
//         }}
//         className="bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         + Add Task
//       </button>

//       {isFormOpen && (
//         <TaskForm
//           addTask={addTask}
//           editTask={editTask}
//           closeForm={closeForm}
//           taskToEdit={taskToEdit}
//         />
//       )}

//       <TaskList
//         tasks={tasks}
//         deleteTask={deleteTask}
//         setTaskToEdit={setTaskToEdit} // Pass setTaskToEdit for editing
//       />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm"; // Assuming you have a TaskForm component

const TaskManager = () => {
  console.log("inside dashboard");
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(loadedTasks);
  }, []);
  console.log("Hellooo");
  // Add or update task in localStorage
  const addOrUpdateTask = (task) => {
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (task.id) {
      // Update existing task
      const updatedTasks = currentTasks.map((t) =>
        t.id === task.id ? task : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } else {
      // Add new task
      const newTask = { ...task, id: Date.now() };
      const updatedTasks = [...currentTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
    setIsFormVisible(false); // Close form after submitting
  };

  // Open form for editing
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsFormVisible(true);
  };

  // Handle canceling form
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setTaskToEdit(null);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={() => setIsFormVisible(true)}>Add Task</button>

      {isFormVisible && (
        <TaskForm
          taskToEdit={taskToEdit}
          addTask={addOrUpdateTask}
          closeForm={handleCloseForm}
        />
      )}

      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleEditTask(task)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
