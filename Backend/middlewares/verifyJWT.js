// Importing the 'jsonwebtoken' library to work with JWT tokens.
const jwt = require('jsonwebtoken');

// Middleware function to verify the JWT token.
const verifyJWT = (req, res, next) => {
    try {
        // Retrieve the Authorization header from the incoming request.
        const authHeader = req.headers['authorization'];

        // If the Authorization header is not present, return a 401 Unauthorized error.
        if (!authHeader) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Check if the token is prefixed with 'Bearer' and extract the token part.
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1] // If 'Bearer ' is present, split and get the token.
            : authHeader; // If no 'Bearer' prefix, use the token directly.

        // Verify the token using the secret key stored in environment variables.
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // If there's an error verifying the token (e.g., invalid or expired), log the error and return a 403 Forbidden response.
            if (err) {
                console.error('JWT Verification Error:', err.message); // Log the error message for debugging.
                return res.status(403).json({ error: 'Invalid or expired token.' });
            }

            // If the token is valid, attach the decoded token payload to the request object (req.user).
            req.user = decoded;

            // Call next() to pass control to the next middleware or route handler.
            next();
        });
    } catch (error) {
        // Catch any unexpected errors, log the error, and return a 500 Internal Server Error response.
        console.error('Unexpected Error in verifyJWT Middleware:', error.message);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

// Export the verifyJWT function so it can be used as middleware in other parts of the application.
module.exports = verifyJWT;
