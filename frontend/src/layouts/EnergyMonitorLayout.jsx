// File: frontend/src/layouts/EnergyMonitorLayout.jsx

import React, { useState } from 'react';

const EnergyMonitorLayout = ({ data, onSessionUpdate }) => {
    const { tasks, title } = data;
    const [energyLog, setEnergyLog] = useState([]);
    const [currentEnergy, setCurrentEnergy] = useState(5);

    const logEnergy = () => {
        const newLog = {
            energy: currentEnergy,
            timestamp: new Date().toLocaleTimeString(),
            taskCompleted: tasks.filter(t => t.completed).length,
        };
        setEnergyLog([...energyLog, newLog]);
    };

    const toggleTask = (id) => {
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        onSessionUpdate({ ...data, tasks: updatedTasks }, true);
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-center p-3 rounded-lg cursor-pointer ${task.completed ? 'bg-green-50 line-through text-gray-500' : 'bg-gray-50'}`}>
                            <div className={`w-5 h-5 rounded border-2 mr-3 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                            {task.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Energy Check-in</h3>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Current Energy (1-10)</label>
                    <div className="flex items-center space-x-3">
                        <input type="range" min="1" max="10" value={currentEnergy} onChange={(e) => setCurrentEnergy(parseInt(e.target.value))} className="w-full" />
                        <span className="text-lg font-bold text-blue-800 w-8">{currentEnergy}</span>
                    </div>
                    <button onClick={logEnergy} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">Log Energy</button>
                </div>
                <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Energy Log:</h4>
                    <ul className="space-y-2 text-sm">
                        {energyLog.map((log, i) => (
                            <li key={i} className="flex justify-between p-2 bg-white/60 rounded">
                                <span>Level: <span className="font-bold">{log.energy}</span></span>
                                <span className="text-gray-500">{log.timestamp}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EnergyMonitorLayout;
