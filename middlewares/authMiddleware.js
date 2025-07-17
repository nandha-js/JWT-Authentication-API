const jwt = require('jsonwebtoken');

/**
 * @desc    Middleware to protect routes by verifying JWT token
 * @access  Private
 */
module.exports = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      msg: 'No token provided. Authorization denied.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object
    req.user = decoded.user;

    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(401).json({
      success: false,
      msg: 'Token is not valid'
    });
  }
};
