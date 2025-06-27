import axios from 'axios';

let VITE_API_LINK;

if (import.meta.env.VITE_LOCAL_SERVER.toLowerCase() === "true") {
  VITE_API_LINK = "http://localhost:5001";
} else {
  VITE_API_LINK = "https://general-api-ht51.onrender.com";
}

const axiosInstance = axios.create({
  baseURL: VITE_API_LINK,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;