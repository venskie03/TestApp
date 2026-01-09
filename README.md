# Project Setup Guide

This guide explains how to set up and run the backend and client for this project.

## Prerequisites
- Node.js installed on your machine.

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
   Create a `.env` file in the `backend` directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
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
