const asyncHandler = require('express-async-handler');
const Joi = require('joi');
const { Message } = require('../Modules/Message'); // تأكد من صحة مسار الـ Model لديك
const sendResponse = require('../utils/respose');

// Validation schemas
const createMessageSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().trim().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  message: Joi.string().trim().min(20).required().messages({
    'string.min': 'Message must be at least 20 characters',
    'string.empty': 'Message cannot be empty',
  }),
  // استخدام .empty('') يخبر Joi أنه إذا كان النص فارغاً، يتم اعتباره undefined وبالتالي يتخطى شرط الـ URI بسلاسة
  link: Joi.string().trim().uri().empty('').optional().messages({
    'string.uri': 'Please enter a valid URL link',
  }),
});

const updateMessageSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().trim().optional(),
  message: Joi.string().trim().min(20).optional(),
  link: Joi.string().trim().uri().empty('').optional(),
});

/**
 * @desc    Create a new message
 * @route   POST /api/messages
 * @access  Public
 */
const createMessage = asyncHandler(async (req, res) => {
  // Validate input
  const { error, value } = createMessageSchema.validate(req.body, { abortEarly: true });
  if (error) {
    res.status(400);
    return sendResponse(res, 400, false, error.details[0].message);
  }

  // استخدام الأطراف التي تمت مراجعتها وتنظيفها (value) بدلاً من req.body مباشرة
  const { name, email, message, link } = value;

  // Create message
  const newMessage = await Message.create({
    name,
    email,
    message,
    link: link || null, // تخزينها كـ null في الداتابيز إذا كانت فارغة لمنع تضارب الـ Validation في Mongoose
  });

  return sendResponse(res, 201, true, 'Message sent successfully', newMessage);
});

/**
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Private/Admin
 */
const getAllMessages = asyncHandler(async (req, res) => {
  // جلب الرسائل وترتيبها من الأحدث للأقدم
  const messages = await Message.find().sort({ createdAt: -1 });
  
  return sendResponse(res, 200, true, 'All messages retrieved successfully', messages);
});

/**
 * @desc    Get single message by ID
 * @route   GET /api/messages/:id
 * @access  Private
 */
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  
  if (!message) {
    res.status(404);
    return sendResponse(res, 404, false, 'Message not found');
  }

  return sendResponse(res, 200, true, 'Message retrieved successfully', message);
});

/**
 * @desc    Update a message
 * @route   PUT /api/messages/:id
 * @access  Private
 */
const updateMessage = asyncHandler(async (req, res) => {
  // Validate input
  const { error } = updateMessageSchema.validate(req.body);
  if (error) {
    res.status(400);
    return sendResponse(res, 400, false, error.details[0].message);
  }

  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!message) {
    res.status(404);
    return sendResponse(res, 404, false, 'Message not found to update');
  }

  return sendResponse(res, 200, true, 'Message updated successfully', message);
});

/**
 * @desc    Delete a message
 * @route   DELETE /api/messages/:id
 * @access  Private
 */
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    res.status(404);
    return sendResponse(res, 404, false, 'Message not found');
  }

  return sendResponse(res, 200, true, 'Message deleted successfully');
});

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};