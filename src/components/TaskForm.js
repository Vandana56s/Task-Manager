import React, { useState, useEffect } from "react";
const TaskForm = ({ addTask, editTask, closeForm, taskToEdit }) => {
  console.log("Task form");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  React.useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate || "");
      setPriority(taskToEdit.priority || "Low");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate,
      priority,
    };

    if (taskToEdit && taskToEdit.id) {
      editTask({
        ...taskData,
        id: taskToEdit.id,
      });
    } else {
      addTask(taskData);
    }
    closeForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 bg-gray-100 rounded text-black"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 bg-gray-100 rounded text-black"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 bg-gray-100 rounded text-black"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 bg-gray-100 rounded text-black"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="flex justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {taskToEdit ? "Save Changes" : "Add Task"}
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="ml-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
