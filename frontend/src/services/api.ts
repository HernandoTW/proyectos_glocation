import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE,
});

// Tipos para TypeScript
export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fechaInicio: string;
  fechaFin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProyectoDto {
  nombre: string;
  descripcion: string;
  estado: string;
  fechaInicio: string;
  fechaFin?: string;
}

export const proyectoService = {
  getAll: () => api.get('/proyectos'),
  getById: (id: number) => api.get(`/proyectos/${id}`),
  create: (data: CreateProyectoDto) => api.post('/proyectos', data),
  update: (id: number, data: Partial<CreateProyectoDto>) => api.put(`/proyectos/${id}`, data),
  delete: (id: number) => api.delete(`/proyectos/${id}`),
};

export const analyticsService = {
  getGraficos: () => api.get('/analytics/graficos'),
  getAnalisis: () => api.post('/analytics/analisis'),
};