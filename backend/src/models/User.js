// backend/src/models/User.js

import pool from '../db.js'; // The PostgreSQL connection pool
import bcrypt from 'bcryptjs';

export class User {
  /**
   * Creates a new user in the database with a hashed password.
   * @param {string} username - The user's chosen username.
   * @param {string} password - The user's plain-text password.
   * @returns {Promise<object>} - The newly created user's ID and username.
   */
  static async create(username, password) {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    const { rows } = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, password_hash]
    );
    return rows[0];
  }

  /**
   * Finds a user by their username.
   * @param {string} username - The username to search for.
   * @returns {Promise<object|undefined>} - The full user object (including hashed password) or undefined if not found.
   */
  static async findByUsername(username) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return rows[0];
  }

  /**
   * Finds a user by their ID.
   * @param {string} id - The UUID of the user.
   * @returns {Promise<object|undefined>} - The user object (excluding password) or undefined if not found.
   */
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT id, username, created_at FROM users WHERE id = $1',
      [id]
    );
    return rows[0];
  }
}
