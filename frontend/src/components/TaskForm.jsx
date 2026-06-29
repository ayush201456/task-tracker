import React, { useState } from 'react';
export default function TaskForm({ onTaskCreated, showNotification }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Task title is required.'); return; }
    setError('');
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status }),
      });
      if (response.ok) {
        setTitle(''); setDescription(''); setStatus('Pending');
        onTaskCreated(); showNotification('Task created!');
      }
    } catch (err) { setError('Failed to connect to server.'); }
  };
  return (
    <form onSubmit={handleSubmit} style={{ background: '#f8fafc', padding: '20px', borderRadius: '6px' }}>
      <h3>Create New Task</h3>
      <div className="form-group"><input type="text" placeholder="Task Title *" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
      {error && <span className="error">{error}</span>}
      <div className="form-group"><textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
      <div className="form-group">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
}