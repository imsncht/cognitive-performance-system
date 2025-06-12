// File: frontend/src/layouts/TimeBoxerLayout.jsx

import React, { useState, useEffect } from 'react';

const TimeBoxerLayout = ({ data, onSessionUpdate }) => {
  const { tasks, title, timeAvailable } = data;
  const primaryTask = tasks[0];

  // --- FIX: Use a reliable source for the timer duration ---
  // Default to the user's specified available time, or 25 minutes.
  const initialDuration = (timeAvailable || 25) * 60;
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isActive, setIsActive] =  useState(false);
  const [isFinished, setIsFinished] = useState(false); // New state to track if timer has finished

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true); // --- FIX: Set finished state instead of alert ---
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(initialDuration);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleComplete = () => {
      if (!primaryTask) return;
      const updatedTasks = tasks.map(t => t.id === primaryTask.id ? { ...t, completed: true } : t);
      onSessionUpdate({ ...data, tasks: updatedTasks }, true);
  };

  if (!primaryTask) {
    return <p className="text-center">No task defined for this session.</p>
  }

  return (
    <div className="bg-yellow-50 p-8 rounded-lg shadow-xl text-center max-w-2xl mx-auto border-2 border-yellow-200">
      <h2 className="text-xl font-semibold text-yellow-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8">Commit to focusing on this one important task.</p>
      
      <div className="bg-white p-10 rounded-xl shadow-inner mb-6">
        <p className="text-3xl font-bold text-gray-800">{primaryTask.text}</p>
      </div>

      <div className={`text-7xl font-mono rounded-lg inline-block px-8 py-4 shadow-inner mb-6 transition-colors ${isFinished ? 'bg-green-200 text-green-800' : 'bg-white'}`}>
          {formatTime(timeLeft)}
      </div>

      {/* --- FIX: Display different buttons based on the timer state --- */}
      {!isFinished ? (
        <div className="flex justify-center space-x-4">
            <button onClick={toggleTimer} className="bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold w-40">
                {isActive ? 'Pause' : 'Start Timer'}
            </button>
            <button onClick={resetTimer} className="text-gray-600 font-semibold">Reset</button>
        </div>
      ) : (
         <div className="text-center">
            <p className="font-bold text-green-700 mb-4">Time's up! Great focus session.</p>
            <button
              onClick={handleComplete}
              disabled={primaryTask.completed}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {primaryTask.completed ? 'Task Completed!' : 'Mark Task as Complete'}
            </button>
         </div>
      )}
    </div>
  );
};

export default TimeBoxerLayout;