import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:10000/api'
})

export default axiosBase
