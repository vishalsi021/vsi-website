// controllers/attendanceController.js
const samvidhaService = require('../services/samvidhaService');

// In-memory cache to store attendance data
const attendanceCache = new Map();
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

exports.fetchAttendance = async (req, res) => {
  const { userId, password } = req.body;

  // Validate input
  if (!userId || !password) {
    return res.status(400).json({
      success: false,
      message: 'User ID and password are required'
    });
  }

  // A more specific validation for IARE user ID format (e.g., 23951A12H7), case-insensitive.
  const userIdPattern = /^\d{5}[a-z]\d{2}[a-z0-9]{2}$/i;
  if (!userIdPattern.test(userId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid User ID format. Please check your IARE email.'
    });
  }
  
  // --- CACHE LOGIC ---
  const cachedEntry = attendanceCache.get(userId);
  if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_DURATION_MS)) {
    console.log(`✅ Serving from cache for user: ${userId}`);
    return res.json({ ...cachedEntry.data, fromCache: true });
  }
  // --- END CACHE LOGIC ---

  try {
    console.log(`📊 Fetching fresh attendance for user: ${userId}`);
    const startTime = Date.now();

    // Fetch attendance data
    const attendanceData = await samvidhaService.fetchAttendanceData(userId, password);

    const endTime = Date.now();
    console.log(`✅ Fresh attendance fetched successfully for ${userId} in ${endTime - startTime}ms`);

    // Store successful fetch in cache
    if (attendanceData.success) {
      attendanceCache.set(userId, { data: attendanceData, timestamp: Date.now() });
    }

    res.json(attendanceData);

  } catch (error) {
    console.error(`❌ Error in fetchAttendance for ${req.body.userId}:`, error.message);

    // **SIMPLIFIED & MORE RELIABLE ERROR HANDLING**
    if (error.message.includes('Invalid credentials')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please check and try again.'
      });
    }

    if (error.message.includes('timeout') || error.message.includes('Navigation timeout')) {
      return res.status(408).json({
        success: false,
        message: 'Request Timeout: The Samvidha portal is taking too long to respond. Please try again later.'
      });
    }

    if (error.message.includes('net::ERR_')) {
      return res.status(503).json({
        success: false,
        message: 'Network Error: Unable to connect to the Samvidha portal.'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while fetching attendance data.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
