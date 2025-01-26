// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://card-games-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    // add other default headers here if necessary
  },
});

// Optional: Add request/response interceptors
axiosInstance.interceptors.response.use(
  (response) => response, // Handle successful responses
  (error) => {
    // Customize error handling (e.g., logging or reporting)
    return Promise.reject(error);
  }
);

export default axiosInstance;
