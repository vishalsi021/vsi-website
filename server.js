// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const attendanceController = require('./controllers/attendanceController');

// Load environment variables from .env file (if it exists)
dotenv.config();

const app = express();
// Use process.env.PORT if available (e.g., on Render), otherwise default to 3000 (or 3001 for local testing)
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests
app.use('/favicon.ico', express.static(path.join(__dirname, 'build', 'favicon.svg'))); // Serve favicon.svg as favicon.ico

// API routes
// Handles requests to fetch attendance data
app.post('/api/fetch-attendance', attendanceController.fetchAttendance);

// Health check endpoint
// A simple endpoint to verify the server is running
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Samvidha Attendance API is running',
    timestamp: new Date().toISOString()
  });
});

// --- IMPORTANT: SERVING REACT FRONTEND ---

// Middleware to ensure .js files are served with the correct MIME type for modules.
// This is crucial for modern JavaScript modules loaded by <script type="module">.
// This must come BEFORE express.static to ensure headers are set correctly.
// Serve the main index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Middleware to ensure .js files are served with the correct MIME type for modules
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Serve all other static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all to redirect any unmatched routes to index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// --- END OF REACT FRONTEND SERVING ---


// Error handling middleware
// Catches any errors that occur during request processing
app.use((err, req, res, next) => {
  console.error('Error:', err); // Log the error for debugging
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    // In development, send the error message for easier debugging.
    // In production, avoid sending sensitive error details.
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
