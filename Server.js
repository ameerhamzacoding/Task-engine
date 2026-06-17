require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);

// temporary error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started successfully");
});