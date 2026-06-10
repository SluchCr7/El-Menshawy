const sendResponse = require('../utils/respose');

/**
 * 404 Not Found middleware — catches any unmatched routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Express error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Internal Server Error';

  // Log error stack trace for debugging
  console.error(`[Server Error] ${err.stack}`);

  // Send formatted JSON error response
  sendResponse(
    res,
    statusCode,
    false,
    message,
    process.env.NODE_ENV === 'development' ? { stack: err.stack } : null
  );
};

module.exports = { notFound, errorHandler };
