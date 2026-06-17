require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./Routes/taskRoutes");

const app = express();

app.use(express.json());

// 1. ADD THIS HEALTH CHECK ROUTE FIRST
app.get("/", (req, res) => {
  res.status(200).json({ status: "Vercel is working perfectly!" });
});

// 2. Wrap your DB connection safely so it doesn't kill the server process if it delays
try {
  connectDB();
} catch (dbError) {
  console.error("Delayed DB Init Error:", dbError.message);
}

app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
  });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Local server started successfully on port ${PORT}`);
  });
}

module.exports = app;
