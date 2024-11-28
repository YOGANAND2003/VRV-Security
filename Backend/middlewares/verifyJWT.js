const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    try {
        // Retrieve token from the Authorization header
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        // Check for Bearer prefix and extract the token
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        // Verify the token using the secret key
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message); // Log for debugging
                return res.status(403).json({ error: 'Invalid or expired token.' });
            }

            req.user = decoded; // Attach the decoded token payload to the request
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        console.error('Unexpected Error in verifyJWT Middleware:', error.message);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

module.exports = verifyJWT;
