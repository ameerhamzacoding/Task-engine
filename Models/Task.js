const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Task text description is required"], 
    trim: true, // Automatically removes space
    maxlength: [50, "Task description cannot exceed 50 characters"], 
    
    unique: true // Prevents identical tasks at the database level 
  },
  priority: {
    type: String,
    required: [true, "Priority level is required"], //
    enum: {
      values: ['Low', 'Medium', 'High'], // Only allows these exact strings 
      message: "Priority must be either Low, Medium, or High" 
    }
  },
  completed: {
    type: Boolean,
    default: false // New tasks start as incomplete 
  }
}, {
  // Automatically handles createdAt and updatedAt timestamps
  timestamps: true // 
});

module.exports = mongoose.model('Task', taskSchema);