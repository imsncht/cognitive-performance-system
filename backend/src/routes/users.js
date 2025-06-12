// backend/src/routes/users.js

import express from 'express';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// === USER REGISTRATION ENDPOINT ===
router.post('/users/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password || password.length < 6) {
      return res.status(400).json({ error: 'Username and a password of at least 6 characters are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }

    const user = await User.create(username, password);
    res.status(201).json({ message: "User registered successfully", userId: user.id });

  } catch (error) {
    next(error);
  }
});

// === USER LOGIN ENDPOINT ===
router.post('/users/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await User.findByUsername(username);
    // Check if user exists and if the password is correct
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Create a secure token for the user to stay logged in
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token expires in 24 hours
    );
    
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    next(error);
  }
});

export default router;
