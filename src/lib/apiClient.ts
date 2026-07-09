import axios from 'axios';

// Create a configured Axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true, // Crucial for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for handling 401s (Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to hit the refresh endpoint
        // Because of withCredentials, the HttpOnly refresh token cookie will be sent automatically
        await axios.post(
          \`\${apiClient.defaults.baseURL}/auth/refresh\`,
          {},
          { withCredentials: true }
        );
        
        // If successful, the server sets a new HttpOnly access token cookie.
        // We can now safely retry the original request.
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login or clear auth state
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
