const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
    }
};

module.exports = connectDB;