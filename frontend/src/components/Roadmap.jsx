// File: frontend/src/components/Roadmap.jsx

import React from 'react';

const Roadmap = ({ tasks, onOpenMap }) => {
  if (!tasks || tasks.length === 0) {
    return null; // Don't render if there are no tasks
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div 
      className="mb-6 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onOpenMap} // This makes the whole component clickable
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">Your Journey</span>
        <span className="text-sm font-bold text-blue-600">{completedCount} / {totalCount} Steps Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
        {/* The progress bar */}
        <div 
          className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {/* The "stars" or checkpoints */}
        <div className="absolute inset-0 flex items-center justify-around">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`w-3 h-3 rounded-full transition-colors duration-500 ${index < completedCount ? 'bg-white' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">Click to see the full map</p>
    </div>
  );
};

export default Roadmap;