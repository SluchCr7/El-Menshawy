const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../Modules/User');
const sendResponse = require('../utils/respose');
const {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
  clearTokenCookies,
} = require('../Middelwares/TokenGenerator');

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 2 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password cannot be empty',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  // Validate input
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400);
    return sendResponse(res, 400, false, error.details[0].message);
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    return sendResponse(res, 400, false, 'User already exists with this email');
  }

  // Create user (password is automatically hashed via Mongoose pre-save hook)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set HTTP-only cookies
    setTokenCookies(res, accessToken, refreshToken);

    return sendResponse(res, 201, true, 'User registered successfully', {
      _id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
    });
  } else {
    res.status(400);
    return sendResponse(res, 400, false, 'Invalid user data');
  }
});

/**
 * @desc    Authenticate user & get tokens
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  // Validate input
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400);
    return sendResponse(res, 400, false, error.details[0].message);
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set HTTP-only cookies
    setTokenCookies(res, accessToken, refreshToken);

    return sendResponse(res, 200, true, 'Logged in successfully', {
      _id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
    });
  } else {
    res.status(401);
    return sendResponse(res, 401, false, 'Invalid email or password');
  }
});

/**
 * @desc    Logout user / clear cookies
 * @route   POST /api/users/logout
 * @access  Public (or Protected)
 */
const logoutUser = asyncHandler(async (req, res) => {
  clearTokenCookies(res);
  return sendResponse(res, 200, true, 'Logged out successfully');
});

/**
 * @desc    Refresh access token
 * @route   POST /api/users/refresh
 * @access  Public (relies on refresh token cookie)
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401);
    return sendResponse(res, 401, false, 'Refresh token not found, please login again');
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401);
      return sendResponse(res, 401, false, 'User associated with token not found');
    }

    // Generate new access and refresh tokens (token rotation for extra security)
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // Update tokens in cookies
    setTokenCookies(res, newAccessToken, newRefreshToken);

    return sendResponse(res, 200, true, 'Token refreshed successfully', {
      accessToken: newAccessToken, // also sent in response body for flexibility (client-side interceptors)
    });
  } catch (error) {
    res.status(401);
    return sendResponse(res, 401, false, 'Invalid or expired refresh token');
  }
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    favorites: req.user.favorites,
  };

  return sendResponse(res, 200, true, 'User profile retrieved', user);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getMe,
};
