// backend/src/routes/ai.js

import express from 'express';
import aiService from '../services/aiService.js';

const router = express.Router();

// Route for generating the INITIAL session plan
router.post('/generate-ui', async (req, res, next) => {
  try {
    const { userInput, userProfile } = req.body;
    if (!userInput || !userProfile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const sessionData = await aiService.generateSessionData(userInput, userProfile);
    res.json(sessionData);
  } catch (error) {
    next(error);
  }
});

// Inside backend/src/routes/ai.js

// ... (keep the POST /generate-ui route the same) ...

// The "update-ui" route:
router.post('/update-ui', async (req, res, next) => {
  try {
    // --- CHANGE: The key is now 'tasks' ---
    const { tasks, newProfile, newContext } = req.body;

    if (!tasks || !newProfile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedSessionData = await aiService.generateSessionUpdate(
      tasks, // Pass the full task list
      newProfile,
      newContext
    );

    res.json(updatedSessionData);

  } catch (error) {
    next(error);
  }
});


export default router;
