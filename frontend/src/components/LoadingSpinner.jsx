// frontend/src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">
        Generating Your Personalized Interface
      </h3>
      <p className="text-gray-600 mb-4">
        AI is analyzing your cognitive state and applying psychology principles...
      </p>
      <div className="flex justify-center space-x-4 text-sm text-gray-500">
        <span>⚡ Cognitive Load Analysis</span>
        <span>🧠 Psychology Engine</span>
        <span>🎨 UI Generation</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;