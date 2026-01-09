# Fokus AI

> **A thinking assistant designed for people with ADHD, dyslexia, and busy minds.**

Fokus AI helps you turn messy, unstructured thoughts into clear, structured outputs. It breaks down big or confusing ideas into small, manageable actions, prioritizes what matters so you can act without overthinking, simplifies language for easier reading, and keeps attention on one clear next step.
---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), TailwindCSS, TypeScript |
| **Backend** | Node.js (Express), Sequelize, Google GenAI, TypeScript, PostgreSQL, Automated deployment (Circle CI/CD) |

---

# Project Setup Guide

This guide explains how to set up and run the backend and client for this project.

## Prerequisites
- Node.js installed on your machine.
- PostgreSQL installed and running.

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file (or `.env.development` / `.env.production`) in the `backend` directory and add your Gemini API key and Database connection details:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3000

   # Database Connection
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=localhost
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The server will start on port 3000 (or the port specified in your .env).

## Client Setup

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `client` directory and add the backend API URL:
   ```env
   VITE_BACKEND_API_URL=http://localhost:3000/api/v1
   ```

4. **Start the client application:**
   ```bash
   npm run dev
   ```
   Open the link provided in the terminal (usually `http://localhost:5173`) to view the app.
