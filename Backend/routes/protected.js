// Import necessary modules
const express = require('express');
const verifyJWT = require('../middlewares/verifyJWT');  // Middleware to verify JWT token
const rbac = require('../middlewares/rbac');  // Middleware for Role-Based Access Control (RBAC)
const router = express.Router();  // Create a new router instance

// Route for the dashboard page
router.get('/dashboard', verifyJWT, (req, res) => {
    // Verify the JWT token and then display a welcome message with the user's role
    res.send(`Welcome ${req.user.role}`);
});

// Route for the Admin dashboard (restricted to Admins only)
router.get('/admin', verifyJWT, rbac(['Admin']), (req, res) => {
    // Only users with 'Admin' role can access this route
    res.send('Admin Dashboard');
});

// Export the router so it can be used in other parts of the application
module.exports = router;
