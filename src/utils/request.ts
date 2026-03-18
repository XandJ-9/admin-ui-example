import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // Add token or other custom headers here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  (response) => {
    // Directly return the data part of the response
    return response.data;
  },
  (error) => {
    // Handle global errors here
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Please check your authentication token or backend configuration.');
    }
    return Promise.reject(error);
  }
);

export default request;
