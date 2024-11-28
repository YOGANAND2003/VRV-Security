// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // The User model to interact with the database
const router = express.Router();
const { body, validationResult } = require('express-validator');  // Used for request validation

const SECRET_KEY = process.env.SECRET_KEY;  // Secret key for signing JWT tokens

// Register route to create a new user
router.post(
    '/register',
    [
        // Validation for 'email': must be a valid email
        body('email').isEmail().withMessage('Invalid email format'),
        
        // Validation for 'password': must be at least 6 characters long
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),

        // Validation for 'role': must be one of 'Admin', 'User', or 'Moderator'
        body('role').isIn(['Admin', 'User', 'Moderator']).withMessage('Invalid role')
    ],
    async (req, res) => {
        // Check for validation errors in the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, role } = req.body;  // Extract the data from request body

        try {
            // Check if a user with the given email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create a new user with the provided details
            const newUser = new User({ username, email, password: hashedPassword, role });

            // Save the user to the database
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Error during user registration:', err);
            res.status(500).json({ error: 'Error registering user' });
        }
    }
);

// Login route to authenticate user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;  // Extract email and password from request body

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate a JWT token with the user's id and role
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        // Send the generated token as response
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get all users route (restricted to Admin role only)
router.get('/users', async (req, res) => {
    const authorizationHeader = req.header('Authorization');  // Get the Authorization header

    // Check if the Authorization header is present
    if (!authorizationHeader) {
        return res.status(403).json({ error: 'No token provided' });
    }
    
    // Extract token from Authorization header
    const token = authorizationHeader.split(" ")[1];  // Token is the second part of the header

    // Check if the token is valid
    if (!token) {
        return res.status(403).json({ error: 'Invalid token format' });
    }

    try {
        // Verify the token using the SECRET_KEY
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id);

        // Check if the user has an Admin role
        if (user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied, only Admin can view all users' });
        }

        // If user is Admin, fetch all users from the database
        const users = await User.find();  
        res.json({ users });
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

// Update user status (e.g., active or disabled)
router.patch('/users/:id/status', async (req, res) => {
    const { status } = req.body;  // Extract the status ('active' or 'disabled')

    try {
        // Find and update the user status by user ID
        const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Return the updated user details
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error updating user status' });
    }
});

// Update user role (Admin/User/Moderator)
router.patch('/users/:id/role', async (req, res) => {
    const { role } = req.body;  // Extract the new role ('Admin', 'User', 'Moderator')

    try {
        // Find and update the user's role by user ID
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Return the updated user details
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error updating user role' });
    }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
