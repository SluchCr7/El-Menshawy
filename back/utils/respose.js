/**
 * Standard API response helper
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Operation success status
 * @param {string} message - User-facing description
 * @param {any} data - Response payload
 */
const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = sendResponse;
