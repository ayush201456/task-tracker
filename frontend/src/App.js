// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://task-tracker-backend-mfjf.onrender.com';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status })
      });
      if (response.ok) {
        setTitle('');
        setDescription('');
        setStatus('Pending');
        fetchTasks();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div className="app-container">
      <h1>Task Tracker</h1>
      
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Create New Task</h2>
        <input 
          type="text" 
          placeholder="Task Title *" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        <textarea 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="btn-submit">Add Task</button>
      </form>

      <div className="task-list-header">
        <h2>Tasks ({filteredTasks.length})</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">No tasks found.</div>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id || task.id} className="task-item">
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description || "No description provided"}</p>
              </div>
              <span className="status-badge">{task.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
