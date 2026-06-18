require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./Routes/taskRoutes");

const app = express();

app.use(express.json());

// Connect to DB
connectDB().catch((err) => {
  console.error("DB connection error:", err.message);
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "API is running" });
});

app.use("/api/tasks", taskRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
  });
});

module.exports = app;