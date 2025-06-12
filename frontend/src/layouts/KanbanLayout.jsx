// File: frontend/src/layouts/KanbanLayout.jsx

import React from 'react';

// Card component for a single task
const KanbanCard = ({ task, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, task.id)}
    className="bg-white p-3 rounded-md shadow cursor-grab active:cursor-grabbing border border-gray-200"
  >
    <p className="text-sm font-medium text-gray-800">{task.text}</p>
  </div>
);

// Column component for "To Do", "In Progress", etc.
const KanbanColumn = ({ title, tasks, status, onDrop, onDragOver, onDragStart }) => (
  <div className="bg-gray-100 rounded-lg p-4 w-full md:w-1/3 flex-shrink-0">
    <h3 className="text-lg font-semibold text-gray-700 mb-4 px-1">{title}</h3>
    <div
      onDrop={(e) => onDrop(e, status)}
      onDragOver={onDragOver}
      className="space-y-3 min-h-[300px] p-1"
    >
      {tasks.map(task => <KanbanCard key={task.id} task={task} onDragStart={onDragStart} />)}
    </div>
  </div>
);

// Main Layout Component
const KanbanLayout = ({ data, onSessionUpdate }) => {
  // Safeguard: Ensure every task has a status, defaulting to "todo"
  const tasksWithStatus = data.tasks.map(t => ({ ...t, status: t.status || 'todo' }));

  const columns = {
    todo: tasksWithStatus.filter(t => t.status === 'todo' && !t.completed),
    inprogress: tasksWithStatus.filter(t => t.status === 'inprogress'),
    done: tasksWithStatus.filter(t => t.status === 'done' || t.completed),
  };
  
  // Drag and drop handler functions are now correctly defined within the component
  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };
  
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    
    const updatedTasks = data.tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, status: newStatus, completed: newStatus === 'done' };
        }
        return task;
    });

    // FIX: Send the entire updated session object and track for undo
    onSessionUpdate({ ...data, tasks: updatedTasks }, true);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{data.title}</h2>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <KanbanColumn title="To Do" status="todo" tasks={columns.todo} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} />
        <KanbanColumn title="In Progress" status="inprogress" tasks={columns.inprogress} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} />
        <KanbanColumn title="Done" status="done" tasks={columns.done} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} />
      </div>
    </div>
  );
};

export default KanbanLayout;