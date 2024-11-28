// Importing the mongoose library to interact with MongoDB.
const mongoose = require('mongoose');

// Defining the schema for the 'User' collection in the MongoDB database.
const userSchema = new mongoose.Schema({
    // 'username' field: a required string that must be unique.
    username: { type: String, required: true, unique: true },

    // 'email' field: a required string that must be unique.
    email: { type: String, required: true, unique: true },

    // 'password' field: a required string to store the user's password.
    password: { type: String, required: true },

    // 'role' field: a string that can only have values from the given enum ('Admin', 'User', 'Moderator').
    // The default value is set to 'User'.
    role: { type: String, enum: ['Admin', 'User', 'Moderator'], default: 'User' },
});

// Creating a model for the 'User' collection based on the userSchema.
module.exports = mongoose.model('User', userSchema);
