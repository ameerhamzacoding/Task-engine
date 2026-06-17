const validateTaskInput = (req, res, next) => {
  const { text, priority } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Task text is mandatory and cannot be empty"
    });
  }

  if (text.trim().length > 50) {
    return res.status(400).json({
      success: false,
      error: "Task text must be 50 characters or less"
    });
  }
  const validPriorities = ["Low", "Medium", "High"];

  if (!priority || !validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      error: "A valid priority (Low, Medium, High) must be assigned"
    });
  }

  next();
};

module.exports = validateTaskInput;