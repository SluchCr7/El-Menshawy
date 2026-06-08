const sendResponse = require('../utils/respose');

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

module.exports = errorHandler;
