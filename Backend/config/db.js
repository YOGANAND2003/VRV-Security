// Importing the mongoose library to interact with MongoDB.
const mongoose = require('mongoose');

// Creating an asynchronous function to connect to the MongoDB database.
const connectDB = async () => {
    try {
        // Attempting to establish a connection to the MongoDB database using the connection string stored in the environment variable 'MONGO_URI'.
        await mongoose.connect(process.env.MONGO_URI);

        // If the connection is successful, a success message is logged to the console.
        console.log('MongoDB Connected...');
    } catch (err) {
        // If an error occurs during the connection attempt, the error message is logged to the console.
        console.error(err.message);

        // If the connection fails, the process exits with a non-zero status (indicating an error).
        process.exit(1);
    }
};

// Exporting the connectDB function so it can be used in other parts of the application.
module.exports = connectDB;
