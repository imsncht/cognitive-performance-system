// File: frontend/src/layouts/ZenFocusLayout.jsx

import React, { useState, useEffect } from 'react';

const ZenFocusLayout = ({ data, onSessionUpdate }) => {
  const { tasks, title } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  // This hook ensures the component always shows the first uncompleted task,
  // even after the parent component adapts the session.
  useEffect(() => {
    const firstUncompletedIndex = tasks.findIndex(task => !task.completed);
    setCurrentIndex(firstUncompletedIndex === -1 ? tasks.length : firstUncompletedIndex);
  }, [tasks]); // Re-run this logic if the tasks array changes.

  const currentTask = tasks[currentIndex];

  const handleComplete = () => {
    if (!currentTask) return;
    const updatedTasks = data.tasks.map((task) =>
      task.id === currentTask.id ? { ...task, completed: true } : task
    );
    onSessionUpdate({ ...data, tasks: updatedTasks }, true);
  };
  
  // A clean "All Done" message
  if (!currentTask) {
    return (
      <div className="text-center p-10 bg-green-50 rounded-lg">
        <h2 className="text-3xl font-bold text-green-800">All Done!</h2>
        <p className="mt-2 text-green-700">You did an amazing job focusing. Take a well-deserved break.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8">Just focus on this one next step.</p>
      
      <div className="bg-white p-10 rounded-xl shadow-inner mb-8 min-h-[120px] flex items-center justify-center">
        <p className="text-3xl font-bold text-gray-800">{currentTask.text}</p>
      </div>

      <button
        onClick={handleComplete}
        className="bg-blue-600 text-white py-4 px-10 rounded-lg font-bold text-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Mark Complete
      </button>
    </div>
  );
};

export default ZenFocusLayout;