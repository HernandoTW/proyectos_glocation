import { Request, Response } from 'express';
import { ProyectoService } from '../services/proyecto.service';
import { CreateProyectoDto, UpdateProyectoDto, Estado } from '../models/proyecto.interface';

const proyectoService = new ProyectoService();

export class ProyectoController {
  async getAllProyectos(req: Request, res: Response) {
    try {
      const result = await proyectoService.getAllProyectos();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async getProyectoById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID debe ser un número válido'
        });
      }

      const result = await proyectoService.getProyectoById(id);
      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async createProyecto(req: Request, res: Response) {
    try {
      const proyectoData: CreateProyectoDto = req.body;
      
      // Validaciones básicas
      if (!proyectoData.nombre || !proyectoData.descripcion || !proyectoData.estado || !proyectoData.fechaInicio) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, descripción, estado y fechaInicio son obligatorios'
        });
      }

      // Validar estado
      if (!Object.values(Estado).includes(proyectoData.estado)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Debe ser uno de: ${Object.values(Estado).join(', ')}`
        });
      }

      const result = await proyectoService.createProyecto(proyectoData);
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async updateProyecto(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID debe ser un número válido'
        });
      }

      const proyectoData: UpdateProyectoDto = req.body;

      // Validar estado si se proporciona
      if (proyectoData.estado && !Object.values(Estado).includes(proyectoData.estado)) {
        return res.status(400).json({
          success: false,
          message: `Estado inválido. Debe ser uno de: ${Object.values(Estado).join(', ')}`
        });
      }

      const result = await proyectoService.updateProyecto(id, proyectoData);
      if (!result.success) {
        return res.status(result.message.includes('no encontrado') ? 404 : 400).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async deleteProyecto(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID debe ser un número válido'
        });
      }

      const result = await proyectoService.deleteProyecto(id);
      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}