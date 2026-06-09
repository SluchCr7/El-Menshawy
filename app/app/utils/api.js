import axios from 'axios';

const apiUrl = `https://mensh-server.vercel.app/api` || 'http://localhost:5001/api';

const API = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle token expiration (401)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data &&
      error.response.data.message === 'access_token_expired'
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token via the refresh endpoint
        await axios.post(
          `${originalRequest.baseURL}/users/refresh`,
          {},
          { withCredentials: true }
        );

        // Retry the original request with the new session cookie
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh token is expired or invalid - clear auth and redirect
        if (typeof window !== 'undefined') {
          // Trigger a custom event to notify AuthContext to log out the user
          window.dispatchEvent(new Event('auth_session_expired'));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
