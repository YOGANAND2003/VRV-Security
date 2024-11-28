// Defining a middleware function `rbac` for Role-Based Access Control (RBAC).
// It takes an array of `allowedRoles` as input and returns a middleware function.
const rbac = (allowedRoles) => (req, res, next) => {
    // Check if the user's role (stored in req.user.role) is NOT in the list of allowed roles.
    if (!allowedRoles.includes(req.user.role)) {
        // If the user's role is not allowed, send a 403 Forbidden response with an error message.
        return res.status(403).json({ error: "You don't have permission to access this resource" });
    }
    
    // If the user's role is allowed, call the next middleware or route handler.
    next();
};

// Export the `rbac` function so it can be used in other parts of the application.
module.exports = rbac;
