import React from 'react';
import TaskItem from './TaskItem';
export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted, showNotification }) {
  if (tasks.length === 0) return <p style={{ textAlign: 'center', color: '#6b7280' }}>No tasks found.</p>;
  return <div>{tasks.map(task => (<TaskItem key={task._id} task={task} onTaskUpdated={onTaskUpdated} onTaskDeleted={onTaskDeleted} showNotification={showNotification} />))}</div>;
}