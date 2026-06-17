require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

// Establish Database Connection
connectDB();

// API Routes
app.use("/api/tasks", taskRoutes);

// Temporary Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
  });
});

// ONLY start the standalone server if running locally (not on Vercel serverless)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Local server started successfully on port ${PORT}`);
  });
}

// Export the app instance for Vercel's serverless handler
module.exports = app;