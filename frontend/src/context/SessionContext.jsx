// frontend/src/context/SessionContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  // All session and UI state now lives here
  const [view, setView] = useState('dashboard');
  const [sessions, setSessions] = useState([]);
  const [sessionData, setSessionData] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskHistory, setTaskHistory] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Effect to fetch sessions when the dashboard is viewed
  useEffect(() => {
    if (view === 'dashboard') {
      fetchSessions();
    }
  }, [view]);

  // Effect for the undo timer
  useEffect(() => {
    if (taskHistory) {
      const timer = setTimeout(() => setTaskHistory(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [taskHistory]);

  const fetchSessions = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await fetch('/api/sessions', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch sessions.');
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (sessionIdToDelete) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/sessions/${sessionIdToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSessions(prev => prev.filter(s => s.id !== sessionIdToDelete));
    } catch (err) {
      console.error("Failed to delete session:", err);
    }
  };

  const handleUserSubmit = async (input, profile) => {
    setUserInput(input);
    setLoading(true);
    const authToken = localStorage.getItem('token');
    try {
      const planResponse = await fetch('/api/generate-ui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ userInput: input, userProfile: profile }),
      });
      if (!planResponse.ok) throw new Error('Failed to generate plan');
      const planData = { ...(await planResponse.json()), originalInput: input };

      const saveResponse = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify({ sessionData: planData })
      });
      if (!saveResponse.ok) throw new Error('Failed to save session');
      const savedSession = await saveResponse.json();
      
      setSessionData(savedSession.session_data);
      setSessionId(savedSession.id);
      setView('active');
    } catch (error) {
      console.error('Failed to create session:', error);
      setView('dashboard');
    } finally {
      setLoading(false);
    }
  };
  
  const handleStateUpdate = async (newProfile, newContext) => {
    setIsUpdateModalOpen(false);
    setLoading(true);
    const authToken = localStorage.getItem('token');
    const currentTasks = sessionData.tasks;
    try {
      const adaptResponse = await fetch('/api/update-ui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ tasks: currentTasks, newProfile, newContext }),
      });
      if (!adaptResponse.ok) throw new Error('Failed to adapt plan');
      const adaptedPlan = await adaptResponse.json();
      const completedTasks = currentTasks.filter(t => t.completed);
      const newSessionData = { ...adaptedPlan, tasks: [...completedTasks, ...adaptedPlan.tasks] };

      await fetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ sessionData: newSessionData })
      });
      setSessionData(newSessionData);
    } catch (error) {
      console.error('UI adaptation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSessionUpdate = (newSessionData, trackHistory = false) => {
    if (trackHistory) {
      setTaskHistory({ ...sessionData });
    }
    setSessionData(newSessionData);
    if (sessionId) {
      const authToken = localStorage.getItem('token');
      fetch(`/api/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ sessionData: newSessionData })
      }).catch(error => console.error('Failed to save session update:', error));
    }
  };

  const handleUndo = () => {
    if (!taskHistory) return;
    handleSessionUpdate(taskHistory, false);
    setTaskHistory(null);
  };

  const handleResumeSession = (session) => {
    setSessionData(session.session_data);
    setSessionId(session.id);
    setUserInput(session.session_data.originalInput || 'Resumed Session');
    setView('active');
  };

  const goToDashboard = () => {
    setSessionData(null);
    setSessionId(null);
    setView('dashboard');
  };

  const value = {
    view,
    sessions,
    sessionData,
    loading,
    userInput,
    taskHistory,
    isUpdateModalOpen,
    isMapOpen,
    setView,
    handleUserSubmit,
    handleStateUpdate,
    handleSessionUpdate,
    handleUndo,
    handleResumeSession,
    handleDeleteSession,
    goToDashboard,
    setIsUpdateModalOpen,
    setIsMapOpen,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
