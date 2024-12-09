// backend/middleware/auth.js
//const jwt = require('jsonwebtoken');

//const authenticateToken = (req, res, next) => {
  //const token = req.headers.authorization?.split(' ')[1]; // Get the token from Bearer

  //if (!token) {
    //return res.status(401).json({ message: 'No token, authorization denied' });
  //}

  //try {
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //req.user = decoded; // Attach user information to the request
    //next();
  //} catch (error) {
    //res.status(403).json({ message: 'Invalid token' });
  //}
//};

//module.exports = authenticateToken;


const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
