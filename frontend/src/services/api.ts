import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE,
});

export const proyectoService = {
  getAll: () => api.get('/proyectos'),
  getById: (id: number) => api.get(`/proyectos/${id}`),
  create: (data: any) => api.post('/proyectos', data),
  update: (id: number, data: any) => api.put(`/proyectos/${id}`, data),
  delete: (id: number) => api.delete(`/proyectos/${id}`),
};

export const analyticsService = {
  getGraficos: () => api.get('/analytics/graficos'),
  getAnalisis: () => api.post('/analytics/analisis'),
};