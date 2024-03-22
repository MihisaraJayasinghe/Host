const jwt = require('jsonwebtoken');
const checkFacultyIt = (req, res, next) => {

    // Get the token from the request headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token and decode its payload
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Access denied. Invalid token.' });
        }
        
        // Check if the decoded token includes the role as 'admin'
        if (decoded.Faculty !== 'Hs') {
            return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
        }
        
        // If role is 'admin', allow access to the next middleware or route handler
        next();
    });
};

module.exports = checkFacultyIt;