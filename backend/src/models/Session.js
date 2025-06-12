// backend/src/models/Session.js

import pool from '../db.js';

export class Session {
  /**
   * Creates a new session in the database for a specific user.
   */
  static async create(userId, sessionData) {
    const { rows } = await pool.query(
      'INSERT INTO sessions (user_id, session_data) VALUES ($1, $2) RETURNING *',
      [userId, sessionData]
    );
    return rows[0];
  }

  /**
   * Updates an existing session's data and timestamp.
   */
  static async update(sessionId, newSessionData) {
    const { rows } = await pool.query(
      'UPDATE sessions SET session_data = $1, last_updated = NOW() WHERE id = $2 RETURNING *',
      [newSessionData, sessionId]
    );
    return rows[0];
  }

  /**
   * Finds all sessions belonging to a specific user, most recent first.
   */
  static async findByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM sessions WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  // Inside backend/src/models/Session.js, within the Session class

  /**
   * Deletes a session by its ID.
   * @param {string} sessionId - The ID of the session to delete.
   * @param {string} userId - The ID of the user to ensure they own the session.
   * @returns {Promise<object|undefined>} - The deleted session or undefined if not found.
   */
  static async delete(sessionId, userId) {
    const { rows } = await pool.query(
      // We also check the user_id to make sure a user can only delete their own sessions.
      'DELETE FROM sessions WHERE id = $1 AND user_id = $2 RETURNING *',
      [sessionId, userId]
    );
    return rows[0];
  }

}


