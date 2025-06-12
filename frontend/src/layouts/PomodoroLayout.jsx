// File: frontend/src/layouts/PomodoroLayout.jsx

import React, { useState, useEffect } from 'react';

const PomodoroLayout = ({ data, onSessionUpdate }) => {
  const { tasks, title } = data;
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(time => time - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsWorkSession(!isWorkSession);
      setTimeLeft(isWorkSession ? 5 * 60 : 25 * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkSession]);

  const toggleTimer = () => setIsActive(!isActive);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    // FIX: Send the entire updated session object and track for undo
    onSessionUpdate({ ...data, tasks: updatedTasks }, true);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className={`p-8 rounded-lg shadow-md text-center transition-colors duration-500 ${isWorkSession ? 'bg-red-50' : 'bg-green-50'}`}>
            <h2 className={`text-3xl font-bold mb-4 ${isWorkSession ? 'text-red-800' : 'text-green-800'}`}>
                {isWorkSession ? 'Focus Session' : 'Short Break'}
            </h2>
            <div className="text-8xl font-mono bg-white rounded-lg inline-block px-8 py-4 shadow-inner mb-6">
                {formatTime(timeLeft)}
            </div>
            <div>
                <button onClick={toggleTimer} className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold w-full">
                    {isActive ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-center p-3 rounded-md cursor-pointer ${task.completed ? 'text-gray-400 line-through' : ''}`}>
                        <div className={`w-5 h-5 rounded border-2 mr-3 flex-shrink-0 ${task.completed ? 'bg-red-400 border-red-400' : 'border-gray-300'}`}></div>
                        {task.text}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default PomodoroLayout;