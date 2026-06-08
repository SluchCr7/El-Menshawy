const jwt = require('jsonwebtoken');
const { User } = require('../Modules/User');
const asyncHandler = require('express-async-handler');
const sendResponse = require('../utils/respose');

/**
 * Middleware to protect routes and verify the access token
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check HTTP-only cookies first
  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  // Fallback to Bearer token header if needed
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    return sendResponse(res, 401, false, 'Not authorized, login required');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Get user from the database, excluding password field
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return sendResponse(res, 401, false, 'Not authorized, user not found');
    }

    next();
  } catch (error) {
    // Handle expired token differently so client knows to refresh
    if (error.name === 'TokenExpiredError') {
      return sendResponse(res, 401, false, 'access_token_expired');
    }
    return sendResponse(res, 401, false, 'Not authorized, invalid token');
  }
});

module.exports = { protect };
