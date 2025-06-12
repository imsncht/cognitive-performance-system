// File: frontend/src/layouts/ReviewDeckLayout.jsx

import React, { useState } from 'react';

const ReviewDeckLayout = ({ data, onSessionUpdate }) => {
    const { tasks, title } = data;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentTask = tasks[currentIndex];

    const goToNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
    };

    const handleComplete = () => {
        const updatedTasks = tasks.map(t => t.id === currentTask.id ? { ...t, completed: true } : t);
        onSessionUpdate({ ...data, tasks: updatedTasks }, true);
    };

    if (!currentTask) {
        return <p>No review items in this session.</p>
    }

    return (
        <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
            <div className="relative h-64 w-full perspective-1000">
                <div 
                    className={`absolute w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front of the card */}
                    <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-2xl flex items-center justify-center p-6 border">
                        <p className="text-2xl font-semibold">{currentTask.text}</p>
                    </div>
                    {/* Back of the card */}
                    <div className="absolute w-full h-full backface-hidden bg-blue-100 rounded-xl shadow-2xl flex items-center justify-center p-6 border rotate-y-180">
                        <p className="text-xl text-blue-800">{currentTask.answer || "Answer goes here."}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-center items-center space-x-4">
                <button onClick={goToNext} className="text-gray-500 font-semibold p-2">Prev</button>
                 <button 
                    onClick={handleComplete}
                    className={`px-8 py-4 text-lg font-bold rounded-lg transition-colors ${currentTask.completed ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'}`}
                >
                    I Knew This
                </button>
                <button onClick={goToNext} className="font-bold text-xl p-2">Next</button>
            </div>
        </div>
    );
};

export default ReviewDeckLayout;