import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const proyectoService = {
  getAll: () => api.get('/proyectos'),
};