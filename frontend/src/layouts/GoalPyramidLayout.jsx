// File: frontend/src/layouts/GoalPyramidLayout.jsx

import React from 'react';

const GoalPyramidLayout = ({ data, onSessionUpdate }) => {
    const { tasks, title } = data;
    
    // Assumes the AI structures tasks with a 'level' property: 'goal', 'milestone', 'task'
    const goal = tasks.find(t => t.level === 'goal');
    const milestones = tasks.filter(t => t.level === 'milestone');
    const dailyTasks = tasks.filter(t => t.level === 'task');

    const toggleTask = (id) => {
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        onSessionUpdate({ ...data, tasks: updatedTasks }, true);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
            {/* The Goal (Apex) */}
            {goal && (
                <div className="p-6 bg-yellow-400 text-yellow-900 rounded-lg shadow-xl text-center">
                    <h3 className="text-2xl font-extrabold">{goal.text}</h3>
                </div>
            )}
            {/* The Milestones */}
            {milestones.length > 0 && (
                <div className="p-6 bg-blue-200 rounded-lg">
                    <h4 className="text-xl font-bold text-blue-800 mb-4">Key Milestones</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {milestones.map(m => <div key={m.id} className="p-3 bg-blue-50 rounded">{m.text}</div>)}
                    </div>
                </div>
            )}
            {/* The Daily Tasks */}
            {dailyTasks.length > 0 && (
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Today's Action Plan</h4>
                    <div className="space-y-3">
                        {dailyTasks.map(task => (
                            <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-center p-3 rounded-md cursor-pointer ${task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-gray-50'}`}>
                                <div className={`w-5 h-5 rounded border-2 mr-3 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}></div>
                                {task.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalPyramidLayout;