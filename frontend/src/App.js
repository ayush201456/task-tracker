// App.js
import React from 'react';
import './App.css'; // Make sure the stylesheet is imported at the top

function App() {
  return (
    <div className="app-container">
      <h1>Task Tracker</h1>
      
      {/* Form Container */}
      <form className="task-form">
        <h2>Create New Task</h2>
        <input type="text" placeholder="Task Title *" required />
        <textarea placeholder="Description"></textarea>
        <select>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="btn-submit">Add Task</button>
      </form>

      {/* Task List Header */}
      <div className="task-list-header">
        <h2>Tasks (0)</h2>
        <select>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Content */}
      <div className="no-tasks">No tasks found.</div>
    </div>
  );
}

export default App;