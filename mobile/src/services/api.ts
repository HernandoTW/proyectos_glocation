import axios from 'axios';

// OPCIÓN 1 (Recomendada):
const API_BASE = 'http://localhost:3000'; // SIN /api

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

export const proyectoService = {
  getAll: () => api.get('/api/proyectos'), // CON /api
};