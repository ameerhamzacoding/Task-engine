const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    // If already connected, don't try to reconnect
    if (isConnected) {
        return;
    }

    if (!process.env.MONGO_URI) {
        require('dotenv').config();
    }

    // Double check if MONGO_URI is still missing
    if (!process.env.MONGO_URI) {
        console.error("CRITICAL: MONGO_URI environment variable is completely missing.");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        // REMOVED process.exit(1) so Vercel doesn't crash fatally
    }
};

module.exports = connectDB;