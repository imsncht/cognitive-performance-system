// File: frontend/src/components/Dashboard.jsx

import React from 'react';
import { useSession } from '../context/SessionContext.jsx';
import LoadingSpinner from './LoadingSpinner';

const SessionCard = ({ session, onResume, onDelete }) => {
  const { title = "Untitled", layout = "N/A", tasks = [] } = session.session_data || {};
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border hover:shadow-xl transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">Layout: {layout}</p>
        </div>
        <span className="text-xs text-gray-400">{new Date(session.created_at).toLocaleDateString()}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button onClick={() => onDelete(session.id)} className="text-sm text-red-500 hover:text-red-700 font-semibold">Delete</button>
        <button onClick={() => onResume(session)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">Resume Session</button>
      </div>
    </div>
  );
};

const Dashboard = ({ user }) => {
  const { sessions, loading, handleResumeSession, handleDeleteSession, setView } = useSession();
  if (loading && !sessions.length) return <LoadingSpinner />;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Resume a past session or start a new journey!</p>
        </div>
        <button onClick={() => setView('creating')} className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-600 shadow-lg flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <span>New Session</span>
        </button>
      </div>
      <div className="space-y-6">
        {sessions.length > 0 ? (
          sessions.map(session => (
            <SessionCard key={session.id} session={session} onResume={handleResumeSession} onDelete={handleDeleteSession} />
          ))
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md"><h3 className="text-2xl font-semibold text-gray-700">No Sessions Yet!</h3><p className="text-gray-500 mt-2">Click "New Session" to start.</p></div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;