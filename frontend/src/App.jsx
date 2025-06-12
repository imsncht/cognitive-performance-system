import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import { SessionProvider, useSession } from './context/SessionContext.jsx';
import Dashboard from './components/Dashboard';
import UserInputForm from './components/UserInputForm';
import AIGeneratedUI from './components/AIGeneratedUI';
//import LoadingSpinner from './components/LoadingSpinner';
import UndoBar from './components/UndoBar';
import UpdateStateModal from './components/UpdateStateModal';
import LayoutSelectorAnimation from './components/LayoutSelectorAnimation';
import './index.css';

// This is the new main component that lives inside the context provider.
const MainAppView = ({ user, onLogout }) => {
  const {
    view,
    loading,
    sessionData,
    taskHistory,
    handleUndo,
    isUpdateModalOpen,
    handleStateUpdate,
    setIsUpdateModalOpen,
    goToDashboard
  } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={goToDashboard}>CPS</h1>
            <p className="text-sm text-gray-600">Welcome, {user.username}!</p>
          </div>
          <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold">Log Out</button>
        </header>

        <main>
          {loading && <LayoutSelectorAnimation />}
          {!loading && view === 'dashboard' && <Dashboard user={user} />}
          {!loading && view === 'creating' && <UserInputForm />}
          {!loading && view === 'active' && sessionData && <AIGeneratedUI />}
          {isUpdateModalOpen && <UpdateStateModal onSubmit={handleStateUpdate} onCancel={() => setIsUpdateModalOpen(false)} />}
        </main>
        
        {taskHistory && <UndoBar onUndo={handleUndo} />}
      </div>
    </div>
  );
}

// App's only job is to manage authentication and provide the context.
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [token]);

  const handleAuthSuccess = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };
  
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <SessionProvider>
      <MainAppView user={user} onLogout={handleLogout} />
    </SessionProvider>
  );
}

export default App;