const mongoose = require('mongoose');

const connectDB = () => {
  const URI = process.env.MONGO_URI;
  
  mongoose.connect(URI).then(() => {
    console.log("MongoDB connection established successfully");
  }).catch((error) => {
    console.log("MongoDB connection failed:", error);
  });
};

module.exports = connectDB;