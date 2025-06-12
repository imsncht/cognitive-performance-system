// frontend/src/components/UpdateStateModal.jsx

import React, { useState } from 'react';

const UpdateStateModal = ({ onSubmit, onCancel }) => {
  const [cognitiveLoad, setCognitiveLoad] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  // --- NEW: State for the mind-dump textarea ---
  const [newContext, setNewContext] = useState('');

  const handleSubmit = () => {
    // Pass both the new profile and the new text context back up
    onSubmit({ cognitiveLoad, energyLevel, stressLevel }, newContext);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Adapt Your Session</h2>
        <div className="space-y-6">
          {/* --- NEW: The mind-dump textarea --- */}
          <div>
            <label htmlFor="new-context" className="block text-sm font-medium text-gray-700 mb-1">
              What's on your mind now? (Optional)
            </label>
            <textarea
              id="new-context"
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              placeholder="e.g., 'I'm stuck on this one part,' or 'I just had a new idea...'"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
             <p className="text-xs text-gray-500 mt-1">Provide new context to get a completely re-evaluated plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mental Load</label>
              <input type="range" min="1" max="10" value={cognitiveLoad} onChange={(e) => setCognitiveLoad(parseInt(e.target.value))} className="w-full" />
              <div className="text-center font-bold">{cognitiveLoad}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Energy Level</label>
              <input type="range" min="1" max="10" value={energyLevel} onChange={(e) => setEnergyLevel(parseInt(e.target.value))} className="w-full" />
              <div className="text-center font-bold">{energyLevel}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stress Level</label>
              <input type="range" min="1" max="10" value={stressLevel} onChange={(e) => setStressLevel(parseInt(e.target.value))} className="w-full" />
              <div className="text-center font-bold">{stressLevel}</div>
            </div>
          </div>

        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Adapt My UI
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStateModal;