-- database/schema.sql

-- Users table to store login information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table to store each generated UI session
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    session_data JSONB -- To store the full context like userInput and userProfile
);

-- Interactions table to log significant user actions
CREATE TABLE interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id),
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    type VARCHAR(255) NOT NULL, -- e.g., 'ui_generated', 'task_completed', 'ui_generation_failed'
    data JSONB -- To store payload like error messages, task details, etc.
);

-- Progress table to track user's long-term progress
CREATE TABLE progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id),
    completed_tasks INT DEFAULT 0,
    total_time_studied INT DEFAULT 0, -- in minutes
    last_updated TIMESTAMPTZ DEFAULT NOW()
);