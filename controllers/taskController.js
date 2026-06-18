const Task = require("../Models/Task");
const mongoose = require("mongoose");
//! Post Request 
const createTask = async (req, res, next) => {
  try {
    // 1. clean from req.body 
    const cleanText = req.body.text.trim(); 
    // 2. Query the database to see if a task with this text already exists
    const existingTask = await Task.findOne({ text: cleanText }); 
    // 3. If a document is found, stop and send a 409 Conflict status
    if (existingTask) { 
      return res.status(409).json({ 
        success: false,
        error: "Data conflict detected: This task already exists!" 
      });
    }
    // 4. check uniqueness and save to mongodb 
    const newTask = await Task.create({ 
      text: cleanText,
      priority: req.body.priority
    });

    // 5. give successfull response 
    return res.status(201).json({ // 
      success: true, // 
      message: "Task created successfully", 
      data: newTask // Includes id, text, priority, completed, and timestamps 
    });

  } catch (error) {
    // Send any unexpected errors 
    next(error); 
  }
};
//! Get request 
const axios = require("axios"); // Import Axios for external API calls

const getAllTasks = async (req, res, next) => {
  try {
    // 1. Read the optional priority query parameter 
    const { priority } = req.query; 
    
    // 2. Construct the Mongoose filter object 
    const filterObject = priority ? { priority } : {}; 

    // 3. Execute the database query to find tasks
    const tasks = await Task.find(filterObject); 

    // 4. Set fallback default quote values in case the external API fails
    let motivationalQuote = "Quality is not an act, it is a habit."; 
    let quoteAuthor = "Aristotle"; //

    // 5. Concurrently fire request to external API wrapped in an independent try/catch block
    try {
      const response = await axios.get("https://zenquotes.io/api/random", { timeout: 3000 }); // 
      
      if (response.data && response.data[0]) {
        motivationalQuote = response.data[0].q; // Extract quote text 
        quoteAuthor = response.data[0].a;   // Extract author text
      }
    } catch (apiError) {
      // Fallback gracefully without failing the main request 
      console.log("External API failed or timed out. Using fallback quote system."); //
    }

    // 6. Return Successful Response Payload
    return res.status(200).json({
      success: true, 
      meta: {
        motivationalQuote, 
        quoteAuthor,       
        count: tasks.length // Total count of tasks returned 
      },
      data: tasks // Array of task documents from MongoDB 
    });

  } catch (error) {
    // Pass unexpected core errors downstream to the global error handler
    next(error); // 
  }
};

//! toogle task 
const toggleTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params; // Grabs the dynamic ID from the URL path

    // 1. Structure Check: Is it a valid 24-character hexadecimal string?
    if (!mongoose.Types.ObjectId.isValid(id)) { 
      return res.status(400).json({ 
        success: false, 
        error: "Invalid task ID structure" 
      });
    }

    // 2. Query the database to find the document matching that ID
    const task = await Task.findById(id); 
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: "Task not found" 
      });
    }
    // If it is false, !false makes it true. If it is true, !true makes it false.
    task.completed = !task.completed; // 

    // 4. Save the change back to MongoDB permanently
    await task.save(); 

    // 5. Return Successful Response Payload (200 OK)
    return res.status(200).json({
      success: true, 
      message: "Task status toggled successfully", 
      data: task // Returns the updated task document with the flipped status 
    });

  } catch (error) {
    next(error); // Sends any database runtime crash downstream to your error handler 
  }
};

//! Clear completed task 
// controllers/taskController.js

const clearCompletedTasks = async (req, res, next) => {
  try {
    // 1. Execute a batch query targeting records that match the completed status 
    const result = await Task.deleteMany({ completed: true }); 

    // 2. Return Successful Response Payload 
    // result.deletedCount 
    return res.status(200).json({
      success: true, 
      message: "Bulk deletion operation processed", 
      deletedCount: result.deletedCount 
    });

  } catch (error) {
    // Forward unexpected database crashes down to the error middleware 
    next(error); 
  }
};
module.exports = {
  createTask,
  getAllTasks,
  toggleTaskStatus,
  clearCompletedTasks 
};


