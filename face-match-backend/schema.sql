-- Face Match Game Database Schema
-- Run this SQL in phpMyAdmin to create the database and tables

CREATE DATABASE IF NOT EXISTS face_match_db;
USE face_match_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level VARCHAR(20) NOT NULL,
    time INT NOT NULL,
    attempts INT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_user_id ON games(user_id);
CREATE INDEX idx_score ON games(score DESC);
CREATE INDEX idx_created_at ON games(created_at DESC);
