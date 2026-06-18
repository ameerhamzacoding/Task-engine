const express = require("express");
const router = express.Router();

const validateTaskInput = require("../middleware/validateTask");
const { createTask,getAllTasks,toggleTaskStatus,clearCompletedTasks } = require("../controllers/taskController");

// POST /api/tasks
router.post("/", validateTaskInput, createTask); 
//GET/api/tasks
router.get("/", getAllTasks);
router.delete("/completed", clearCompletedTasks);
router.patch("/:id/toggle", toggleTaskStatus);
module.exports = router;