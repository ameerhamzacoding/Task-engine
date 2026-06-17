const mongoose = require('mongoose');

const connectDB = async () => {
    // If process.env.MONGO_URI is missing, fall back to trying to load dotenv manually
    if (!process.env.MONGO_URI) {
        require('dotenv').config();
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;