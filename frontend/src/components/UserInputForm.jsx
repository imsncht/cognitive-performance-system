import React, { useState } from 'react';
import { useSession } from '../context/SessionContext.jsx'; // Import the hook

const UserInputForm = () => {
  // --- FIX: Get the submit handler from the context ---
  const { handleUserSubmit } = useSession(); 
  const [input, setInput] = useState('');
  const [cognitiveLoad, setCognitiveLoad] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [timeAvailable, setTimeAvailable] = useState(60);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const userProfile = {
      cognitiveLoad,
      energyLevel,
      stressLevel,
      timeAvailable,
      timestamp: new Date().toISOString(),
    };
    // Call the function from the context
    handleUserSubmit(input, userProfile);
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Describe Your Study Situation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... The rest of the form JSX is unchanged ... */}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you need to study or accomplish?
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'I have 3 hours to study calculus for tomorrow's exam, feeling overwhelmed...'"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Mental Load (1-10)</label>
            <div className="flex items-center space-x-4">
              <input type="range" min="1" max="10" value={cognitiveLoad} onChange={(e) => setCognitiveLoad(parseInt(e.target.value))} className="flex-1"/>
              <span className="text-lg font-medium text-gray-800 w-8">{cognitiveLoad}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">1 = Very clear minded, 10 = Overwhelmed</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Energy Level (1-10)</label>
            <div className="flex items-center space-x-4">
              <input type="range" min="1" max="10" value={energyLevel} onChange={(e) => setEnergyLevel(parseInt(e.target.value))} className="flex-1"/>
              <span className="text-lg font-medium text-gray-800 w-8">{energyLevel}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">1 = Exhausted, 10 = Highly energized</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stress Level (1-10)</label>
            <div className="flex items-center space-x-4">
              <input type="range" min="1" max="10" value={stressLevel} onChange={(e) => setStressLevel(parseInt(e.target.value))} className="flex-1"/>
              <span className="text-lg font-medium text-gray-800 w-8">{stressLevel}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">1 = Very calm, 10 = Extremely stressed</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Available (minutes)</label>
            <input type="number" value={timeAvailable} onChange={(e) => setTimeAvailable(parseInt(e.target.value))} min="15" max="480" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>

        <button
          type="submit"
          disabled={!input.trim()}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Generate My Personalized Study Interface
        </button>
      </form>
    </div>
  );
};

export default UserInputForm;