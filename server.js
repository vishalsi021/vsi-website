// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const attendanceController = require('./controllers/attendanceController');

// Load environment variables from .env file (if it exists)
dotenv.config();

const app = express();
// Use process.env.PORT if available (e.g., on Railway), otherwise default to 3000
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// API routes
app.post('/api/fetch-attendance', attendanceController.fetchAttendance);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Samvidha Attendance API is running',
    timestamp: new Date().toISOString()
  });
});

// --- IMPORTANT: SERVING REACT FRONTEND (for local testing only, not for Railway deployment) ---
// For Railway deployment, this section will be ignored as Vercel serves the frontend.
// This is only if you were to run the backend locally and serve a local frontend build.
// For actual deployment, Vercel serves the frontend, and Railway only needs the API.
// However, we keep it for a complete server.js if it were to serve a 'dist' folder.
app.use(express.static(path.join(__dirname, 'dist'))); // Assumes 'dist' is copied here
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// --- END OF REACT FRONTEND SERVING ---


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 VSI server running on port ${PORT}`);
  console.log(`- Frontend available at http://localhost:${PORT}`);
  console.log(`- API health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;