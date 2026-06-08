const express = require("express");
const router = express.Router();

// 1. استدعاء الـ Middleware اللي أنت كتبته
const { protect } = require("../Middelwares/authMiddleware"); // تأكد من المسار الصحيح لملفك

// 2. استدعاء الـ Controllers
const {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage
} = require("../Controllers/MessageController");

// المسار الرئيسي: /api/messages
router.route("/")
    .post(createMessage)               // Public: أي حد يقدر يبعت رسالة
    .get(protect, getAllMessages);     // Protected: الأدمن أو المستخدم المسجل فقط يقدر يشوف كل الرسائل

// المسارات التي تحتاج ID: /api/messages/:id
router.route("/:id")
    .get(protect, getMessageById)      // Protected
    .put(protect, updateMessage)       // Protected
    .delete(protect, deleteMessage);   // Protected

module.exports = router;