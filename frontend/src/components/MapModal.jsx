import React from 'react';

const MapModal = ({ tasks, title, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}: Full Map</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className={`flex items-start p-4 rounded-lg transition-all duration-200 ${task.completed ? 'bg-green-50 text-gray-500' : 'bg-gray-50'}`}>
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 mt-1 flex-shrink-0 flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                        {task.completed && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MapModal;