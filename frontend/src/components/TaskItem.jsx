import React from 'react';
export default function TaskItem({ task, onTaskUpdated, onTaskDeleted, showNotification }) {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) { onTaskUpdated(); showNotification(`Updated to ${newStatus}`); }
    } catch (err) { console.error(err); }
  };
  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      try {
        const res = await fetch(`${API_URL}/${task._id}`, { method: 'DELETE' });
        if (res.ok) { onTaskDeleted(); showNotification('Task deleted.'); }
      } catch (err) { console.error(err); }
    }
  };
  return (
    <div className={`task-card ${task.status.replace(' ', '-')}`}>
      <div>
        <h4 style={{ margin: 0, textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>{task.title}</h4>
        <p style={{ margin: '5px 0', color: '#4b5563', fontSize: '14px' }}>{task.description}</p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <select value={task.status} onChange={(e) => handleStatusChange(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleDelete} className="btn" style={{ background: '#ef4444', color: 'white', padding: '5px' }}>Delete</button>
      </div>
    </div>
  );
}