// File: frontend/src/layouts/TaskListLayout.jsx

import React from 'react';

const TaskListLayout = ({ data, onSessionUpdate }) => {
  const { tasks, title } = data;

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // FIX: Send the entire updated session object and track for undo
    onSessionUpdate({ ...data, tasks: updatedTasks }, true);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              task.completed
                ? 'bg-green-50 text-gray-500 line-through'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
              {task.completed && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="flex-1">{task.text}</span>
          </div>
        ))}
      </div>
       {tasks.every(t => t.completed) && (
        <p className="text-center mt-6 text-green-600 font-semibold">All tasks complete. Well done!</p>
      )}
    </div>
  );
};

export default TaskListLayout;