// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const attendanceController = require('./controllers/attendanceController');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VSI server running on port ${PORT}`);
  console.log(`- Frontend available at http://localhost:${PORT}`);
  console.log(`- API health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;