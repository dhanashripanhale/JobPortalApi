const jwt = require('jsonwebtoken');

const logRequestTime = (req, res, next) => {
    console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
    next();
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if no token
        // return res.status(401).json({ error: "Unauthorized User" }); 

    }

    jwt.verify(token, 'replace-with-a-strong-secret-key', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid

        }
        req.user = user; // Attach the decoded user information to the request object
        next(); // Call next to continue to the next middleware or route handler
    });
};

module.exports = { logRequestTime, authenticateToken };
