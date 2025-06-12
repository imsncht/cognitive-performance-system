// File: frontend/src/layouts/StepSequencerLayout.jsx

import React, { useState, useEffect } from 'react';

const StepSequencerLayout = ({ data, onSessionUpdate }) => {
  const { tasks, title } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  // This hook makes the component "aware" of external changes to the task list.
  // It finds the first uncompleted task and sets it as the current step.
  useEffect(() => {
    const firstUncompletedIndex = tasks.findIndex(task => !task.completed);
    setCurrentIndex(firstUncompletedIndex === -1 ? tasks.length : firstUncompletedIndex);
  }, [tasks]);

  const currentTask = tasks[currentIndex];

  const goToStep = (index) => {
    if (index >= 0 && index < tasks.length) {
      setCurrentIndex(index);
    }
  };

  const toggleTask = () => {
    if (!currentTask) return;
    const updatedTasks = tasks.map(t => 
      t.id === currentTask.id ? { ...t, completed: !t.completed } : t
    );
    onSessionUpdate({ ...data, tasks: updatedTasks }, true);
  };

  // A clear "all done" state for when there's no current task
  if (!currentTask) {
    return (
        <div className="text-center p-10 bg-green-50 rounded-lg">
            <h2 className="text-3xl font-bold text-green-800">All Steps Completed!</h2>
            <p className="mt-2 text-green-700">Incredible work. You've completed your plan.</p>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      <p className="text-center text-gray-500 mb-8">Follow the plan one step at a time to reach your goal.</p>
      
      {/* Step Indicator - now with flex-wrap for smaller screens */}
      <div className="flex items-center justify-center space-x-2 mb-8 flex-wrap gap-y-2">
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <div 
              onClick={() => goToStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer font-bold transition-all ${
                index === currentIndex 
                  ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-300' 
                  : task.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < tasks.length - 1 && <div className="w-4 sm:w-8 h-1 bg-gray-300 rounded-full"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Current Step Display */}
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-blue-600">Step {currentIndex + 1} of {tasks.length}</span>
            <div onClick={toggleTask} className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-600">
              <div className={`w-5 h-5 rounded border-2 transition-colors ${currentTask.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}></div>
              <span className="font-semibold">{currentTask.completed ? 'Completed' : 'Mark as Complete'}</span>
            </div>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center min-h-[100px] flex items-center justify-center">
            {currentTask.text}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={() => goToStep(currentIndex - 1)} disabled={currentIndex === 0} className="flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold bg-white shadow border disabled:opacity-50 disabled:cursor-not-allowed">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span>Previous</span>
        </button>
        <button onClick={() => goToStep(currentIndex + 1)} disabled={currentIndex >= tasks.length - 1} className="flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            <span>Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default StepSequencerLayout;