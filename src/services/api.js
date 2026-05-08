import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // Link correto
  timeout: 10000, // Timeout normal
});

export default api;