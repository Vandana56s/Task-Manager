// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// import Calendar from "./components/Calender";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showTaskForm, setShowTaskForm] = useState(false);

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//     setTasks(storedTasks);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = (task) => {
//     setTasks([...tasks, { ...task, id: Date.now() }]);
//     setShowTaskForm(false);
//   };

//   const updateTask = (updatedTask) => {
//     setTasks(
//       tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-900 text-white pt-20 px-8">
//         <Navbar onSearch={setSearchTerm} />
//         <Routes>
//           <Route
//             path="/tasks"
//             element={
//               <div>
//                 <h1 className="text-3xl font-bold text-center mb-4">
//                   Task Manager
//                 </h1>
//                 <button
//                   onClick={() => setShowTaskForm(true)}
//                   className="w-full mb-4 bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
//                 >
//                   + Add Task
//                 </button>
//                 <TaskList
//                   tasks={filteredTasks}
//                   updateTask={updateTask}
//                   deleteTask={deleteTask}
//                 />
//                 {showTaskForm && (
//                   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
//                       <h2 className="text-xl font-semibold mb-4">
//                         Add New Task
//                       </h2>
//                       <TaskForm
//                         addTask={addTask}
//                         closeForm={() => setShowTaskForm(false)}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             }
//           />
//           <Route
//             path="/calendar"
//             element={<Calendar tasks={filteredTasks} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calender";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setShowTaskForm(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white pt-20 px-8">
        <Navbar onSearch={setSearchTerm} />
        <Routes>
          <Route
            path="/tasks"
            element={
              <div>
                <h1 className="text-3xl font-bold text-center mb-4">
                  Task Manager
                </h1>

                <TaskList
                  tasks={filteredTasks}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
                {showTaskForm && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-2px">
                    <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
                      <h2 className="text-xl font-semibold mb-4">
                        Add New Task
                      </h2>
                      <TaskForm
                        addTask={addTask}
                        closeForm={() => setShowTaskForm(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/calendar"
            element={<Calendar tasks={filteredTasks} />}
          />
          <Route path="/" element={<Navigate to="/tasks" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
