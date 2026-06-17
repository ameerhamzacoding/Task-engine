// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("System Error Caught:", err); 
  // 2. Handle Mongoose duplicate key errors natively
  if (err.code === 11000) { // 
    return res.status(409).json({ 
      success: false, 
      error: "Data conflict detected: This task already exists!" 
    });
  }
  // 3. Fallback for general unhandled runtime exceptions
  return res.status(500).json({ 
    success: false, 
    error: "A catastrophic internal system error occurred." 
  });
};

module.exports = errorHandler;