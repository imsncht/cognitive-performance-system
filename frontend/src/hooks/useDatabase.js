// frontend/src/hooks/useDatabase.js
import { useState, useCallback } from 'react';

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);

  const saveUserInteraction = useCallback(async (interactionData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          interactionType: interactionData.type,
          data: interactionData.payload
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to save interaction:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserProgress = useCallback(async (progressData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progressUpdate: progressData,
          timestamp: new Date().toISOString()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to update progress:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSessionData = useCallback(async (sessionData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionData: sessionData,
          timestamp: new Date().toISOString()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to save session:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    saveUserInteraction,
    updateUserProgress,
    saveSessionData,
    loading
  };
};