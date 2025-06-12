// File: frontend/src/components/AuthPage.jsx

import React, { useState } from 'react';
import AuthForm from './AuthForm';

const AuthPage = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [error, setError] = useState('');

  const handleAuth = async (username, password) => {
    setError(''); // Clear previous errors
    const endpoint = mode === 'login' ? '/api/users/login' : '/api/users/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `An error occurred.`);
      }

      if (mode === 'register') {
        // After successful registration, switch to login mode
        setMode('login');
        alert('Registration successful! Please log in.'); // Simple feedback
      } else {
        // On successful login, pass the user data and token up to App.jsx
        onAuthSuccess(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const isLogin = mode === 'login';

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        {isLogin ? 'Welcome Back!' : 'Create Your Account'}
      </h2>
      <p className="text-center text-gray-500 mb-8">
        {isLogin ? 'Log in to continue your journey.' : 'Get started with your personalized system.'}
      </p>

      <AuthForm mode={mode} onSubmit={handleAuth} error={error} />

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setMode(isLogin ? 'register' : 'login');
            setError('');
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Log In'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;