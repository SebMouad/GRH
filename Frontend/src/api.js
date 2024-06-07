import axios from 'axios';

const api = axios.create({
  baseURL: 'https://grh-api.vercel.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
