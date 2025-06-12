// backend/src/routes/sessions.js

import express from 'express';
import { Session } from '../models/Session.js';
import { auth } from '../middleware/auth.js'; // Import our security guard

const router = express.Router();

// === CREATE A NEW SESSION ===
// This route is protected. A user must be logged in to create a session.
router.post('/sessions', auth, async (req, res, next) => {
  try {
    const userId = req.user.userId; // Get user ID from the decoded token
    const { sessionData } = req.body;

    if (!sessionData) {
      return res.status(400).json({ error: 'sessionData is required.' });
    }

    const newSession = await Session.create(userId, sessionData);
    res.status(201).json(newSession);

  } catch (error) {
    next(error);
  }
});

// === GET ALL SESSIONS FOR A USER ===
// This will be used later for the dashboard.
router.get('/sessions', auth, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const sessions = await Session.findByUser(userId);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

// === UPDATE AN EXISTING SESSION ===
router.put('/sessions/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { sessionData } = req.body;

        const updatedSession = await Session.update(id, sessionData);
        if (!updatedSession) {
            return res.status(404).json({ error: 'Session not found.' });
        }
        res.json(updatedSession);

    } catch(error) {
        next(error);
    }
});

// Inside backend/src/routes/sessions.js

// ... (keep the existing POST and GET routes) ...

// === DELETE AN EXISTING SESSION ===
router.delete('/sessions/:id', auth, async (req, res, next) => {
    try {
        const sessionId = req.params.id;
        const userId = req.user.userId;

        const deletedSession = await Session.delete(sessionId, userId);

        if (!deletedSession) {
            return res.status(404).json({ error: 'Session not found or user not authorized.' });
        }

        res.status(200).json({ message: 'Session deleted successfully.', deletedSession });

    } catch(error) {
        next(error);
    }
});


export default router;
