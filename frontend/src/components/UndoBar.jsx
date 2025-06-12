// frontend/src/components/UndoBar.jsx

import React from 'react';

const UndoBar = ({ onUndo }) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
      <div className="bg-gray-800 text-white rounded-lg shadow-2xl flex items-center justify-between py-3 px-6 animate-fade-in-up">
        <span className="mr-6">Task marked as complete.</span>
        <button 
          onClick={onUndo}
          className="font-bold text-blue-400 hover:text-blue-300 underline"
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default UndoBar;
