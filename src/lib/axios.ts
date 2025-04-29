import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:5500/api/v1/'  // adjust to your backend URL
  // baseURL: 'https://swach-chain-server.onrender.com/api/v1/'  // adjust to your backend URL
});

// Automatically include JWT token in request headers
axiosApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosApi