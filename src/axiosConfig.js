import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:10000/api'
})

axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase
