// backend/src/middleware/auth.js

import jwt from 'jsonwebtoken';

// This middleware function will be a "gatekeeper" for our protected routes.
export const auth = (req, res, next) => {
  try {
    // Get the token from the 'Authorization' header (e.g., "Bearer YOUR_TOKEN_HERE")
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      // If no token is provided, deny access.
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify the token is valid and hasn't expired.
    // It uses the JWT_SECRET from your .env file to decode it.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user's information (from the token) to the request object.
    // Now, any subsequent route handler can access `req.user`.
    req.user = decoded;
    
    // If the token is valid, pass control to the next function in the chain (the route handler).
    next();

  } catch (error) {
    // If jwt.verify fails, it will throw an error.
    res.status(400).json({ error: 'Invalid token.' });
  }
};
