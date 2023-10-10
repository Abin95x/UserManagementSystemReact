
const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    // console.log("middle ware logged")
    // console.log(req.headers)
  const token = req.headers.authorization      // Assuming you send the token in the 'x-auth-token' header
   // console.log("token---",token)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
    req.adminId = decoded.adminId;         // Add the adminId to the request object for later use
    next();
    
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {authenticateAdmin};
