const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const SECRET_KEY = process.env.SECRET_KEY;

// Register
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('role').isIn(['Admin', 'User', 'Moderator']).withMessage('Invalid role')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, role } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword, role });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        }  catch (err) {
            console.error('Error during user registration:', err);
            res.status(500).json({ error: 'Error registering user' });
        }
    }
);

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get all users (for Admin role only)
// Get all users (for Admin role only)
router.get('/users', async (req, res) => {
    const authorizationHeader = req.header('Authorization');
    // Check if the Authorization header is present
    if (!authorizationHeader) {
        return res.status(403).json({ error: 'No token provided' });
    }
    
    // Extract token from Authorization header
    const token = authorizationHeader.split(" ")[1];  // Token is the second part

    if (!token) {
        return res.status(403).json({ error: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id);

        // Check if the user is an Admin
        if (user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied, only Admin can view all users' });
        }

        const users = await User.find();  // Fetch all users
        res.json({ users });
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});
router.patch('/users/:id/status', async (req, res) => {
    const { status } = req.body;  // The status ('active' or 'disabled')
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);  // Return updated user
    } catch (err) {
        res.status(500).json({ error: 'Error updating user status' });
    }
});

// Update user role (Admin/User/Moderator)
router.patch('/users/:id/role', async (req, res) => {
    const { role } = req.body;  // The new role ('Admin', 'User', 'Moderator')
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);  // Return updated user
    } catch (err) {
        res.status(500).json({ error: 'Error updating user role' });
    }
});



module.exports = router;
