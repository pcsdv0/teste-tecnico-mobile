import axios from 'axios';

// Preferi criar uma instância centralizada do Axios em vez de usar o 'fetch' nativo espalhado por cada tela do app.
// Se a URL base da API mudar no futuro eu só preciso alterar aqui em um único arquivo, facilitando muito a manutenção.

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  
  timeout: 10000, 
});

export default api;