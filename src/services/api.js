import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // previne loading infinito caso a internet ou a API caiam
});

export default api;