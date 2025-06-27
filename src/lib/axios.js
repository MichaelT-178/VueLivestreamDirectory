import axios from 'axios';

const VITE_API_LINK = "https://general-api-ht51.onrender.com";

const axiosInstance = axios.create({
  baseURL: VITE_API_LINK,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;