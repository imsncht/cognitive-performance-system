// frontend/src/components/SessionHost.jsx

import React, { useState } from 'react';
import { useSession } from '../context/SessionContext.jsx'; // Import the hook
import { layouts } from '../layouts';
import Roadmap from './Roadmap';
import MapModal from './MapModal';
import InfoModal from './InfoModal';

const SessionHost = () => {
  // --- FIX: Get EVERYTHING from the context, no more props! ---
  const {
    sessionData,
    userInput,
    goToDashboard,
    setIsUpdateModalOpen, // <-- Get the function from the context
    handleSessionUpdate,
    isMapOpen,
    setIsMapOpen,
  } = useSession();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  
  const layoutName = sessionData?.layout;
  const LayoutComponent = layouts[layoutName];

  if (!LayoutComponent) {
    return <p className="text-center text-red-500">Error: Layout "{layoutName}" not found.</p>
  }

  const { tasks, title } = sessionData;

  return (
    <>
      {isMapOpen && <MapModal tasks={tasks} title={title} onClose={() => setIsMapOpen(false)} />}
      {isInfoOpen && <InfoModal layoutName={layoutName} onClose={() => setIsInfoOpen(false)} />}

      <div className="max-w-6xl mx-auto">
        <Roadmap tasks={tasks} onOpenMap={() => setIsMapOpen(true)} />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                {title}
                <button onClick={() => setIsInfoOpen(true)} className="ml-3 text-gray-400 hover:text-blue-600" title="Why this layout?">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </button>
              </h3>
              <p className="text-sm text-gray-600">Generated based on: {(userInput || '').substring(0, 50)}...</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* --- FIX: The button now correctly calls the function from the context --- */}
              <button onClick={() => setIsUpdateModalOpen(true)} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 font-semibold transition-colors">Adapt Interface</button>
              <button onClick={goToDashboard} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Start New</button>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 min-h-[400px]">
            <LayoutComponent 
              data={sessionData} 
              onSessionUpdate={handleSessionUpdate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionHost;
