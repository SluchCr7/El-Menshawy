'use client';

import React, { createContext, useContext, useState } from 'react';
import API from './api'; // استدعاء أكسيوس المجهز بالـ Interceptors والـ Cookies

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
// 1. إرسال رسالة جديدة (متاحة للجميع - Public)
const sendMessage = async (name, email, message, link = '') => {
  setError(null);
  setLoading(true);
  
  // تنظيف البيانات وعمل Trim للفراغات الزائدة
  const payload = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    // إذا كان الرابط فارغاً تماماً أو يحتوي على مسافات فقط لا نرسله كـ نص فارغ بل نلغيه أو نرسله undefined ليقوم Joi بمعالجته
    link: link.trim() === '' ? undefined : link.trim()
  };

  try {
    const response = await API.post('/messages', payload);
    if (response.data && response.data.success) {
      setMessages((prevMessages) => [response.data.data, ...prevMessages]);
      return { success: true, message: response.data.message };
    }
  } catch (err) {
    const errMsg = err.response?.data?.message || 'فشل في إرسال الرسالة. يرجى المحاولة لاحقاً.';
    setError(errMsg);
    return { success: false, message: errMsg };
  } finally {
    setLoading(false);
  }
};

  // 2. جلب جميع الرسائل (محمية - للأدمن أو المسجلين فقط)
  const fetchAllMessages = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await API.get('/messages');
      if (response.data && response.data.success) {
        setMessages(response.data.data);
        return { success: true, messages: response.data.data };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'فشل في جلب الرسائل من السيرفر.';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // 3. حذف رسالة معينة بواسطة الـ ID (محمية)
  const deleteMessage = async (messageId) => {
    setError(null);
    try {
      const response = await API.delete(`/messages/${messageId}`);
      if (response.data && response.data.success) {
        // تحديث الحالة وحذف الرسالة فوراً من واجهة المستخدم (UI)
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
        return { success: true, message: response.data.message };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'فشل في حذف الرسالة.';
      setError(errMsg);
      return { success: false, message: errMsg };
    }
  };

  // 4. جلب رسالة واحدة محددة (لو تحتاجها لعرض تفاصيل رسالة في صفحة منفصلة)
  const getSingleMessage = async (messageId) => {
    setError(null);
    setLoading(true);
    try {
      const response = await API.get(`/messages/${messageId}`);
      if (response.data && response.data.success) {
        return { success: true, data: response.data.data };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'فشل في جلب تفاصيل الرسالة.';
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
        fetchAllMessages,
        deleteMessage,
        getSingleMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// الـ Hook المخصص للاستخدام المباشر في الـ Components
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};