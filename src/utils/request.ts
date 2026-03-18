import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // Add token or other custom headers here if needed
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
    return Promise.reject(error);
  }
);

export default request;
