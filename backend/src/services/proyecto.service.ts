import { ProyectoRepository } from '../repositories/proyecto.repository';
import { Proyecto, CreateProyectoDto, UpdateProyectoDto, Estado } from '../models/proyecto.interface';
import { ApiResponse } from '../models/api.response';

export class ProyectoService {
  private proyectoRepository: ProyectoRepository;

  constructor() {
    this.proyectoRepository = new ProyectoRepository();
  }

  async getAllProyectos(): Promise<ApiResponse<Proyecto[]>> {
    try {
      const proyectos = await this.proyectoRepository.findAll();
      return {
        success: true,
        message: 'Proyectos obtenidos exitosamente',
        data: proyectos
      };
    } catch (error) {
      throw new Error(`Error al obtener proyectos: ${error}`);
    }
  }

  async getProyectoById(id: number): Promise<ApiResponse<Proyecto>> {
    try {
      const proyecto = await this.proyectoRepository.findById(id);
      if (!proyecto) {
        return {
          success: false,
          message: 'Proyecto no encontrado'
        };
      }
      return {
        success: true,
        message: 'Proyecto obtenido exitosamente',
        data: proyecto
      };
    } catch (error) {
      throw new Error(`Error al obtener proyecto: ${error}`);
    }
  }

  async createProyecto(data: CreateProyectoDto): Promise<ApiResponse<Proyecto>> {
    try {
      // Validar fecha fin mayor que fecha inicio
      if (data.fechaFin && data.fechaFin < data.fechaInicio) {
        return {
          success: false,
          message: 'La fecha de fin no puede ser anterior a la fecha de inicio'
        };
      }

      const proyecto = await this.proyectoRepository.create(data);
      return {
        success: true,
        message: 'Proyecto creado exitosamente',
        data: proyecto
      };
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message: 'Ya existe un proyecto con ese nombre'
        };
      }
      throw new Error(`Error al crear proyecto: ${error}`);
    }
  }

  async updateProyecto(id: number, data: UpdateProyectoDto): Promise<ApiResponse<Proyecto>> {
    try {
      // Validar que el proyecto existe
      const existingProyecto = await this.proyectoRepository.findById(id);
      if (!existingProyecto) {
        return {
          success: false,
          message: 'Proyecto no encontrado'
        };
      }

      // Validar fecha fin mayor que fecha inicio
      if (data.fechaFin && data.fechaInicio && data.fechaFin < data.fechaInicio) {
        return {
          success: false,
          message: 'La fecha de fin no puede ser anterior a la fecha de inicio'
        };
      }

      const proyecto = await this.proyectoRepository.update(id, data);
      return {
        success: true,
        message: 'Proyecto actualizado exitosamente',
        data: proyecto
      };
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message: 'Ya existe un proyecto con ese nombre'
        };
      }
      throw new Error(`Error al actualizar proyecto: ${error}`);
    }
  }

  async deleteProyecto(id: number): Promise<ApiResponse<Proyecto>> {
    try {
      // Validar que el proyecto existe
      const existingProyecto = await this.proyectoRepository.findById(id);
      if (!existingProyecto) {
        return {
          success: false,
          message: 'Proyecto no encontrado'
        };
      }

      const proyecto = await this.proyectoRepository.delete(id);
      return {
        success: true,
        message: 'Proyecto eliminado exitosamente',
        data: proyecto
      };
    } catch (error) {
      throw new Error(`Error al eliminar proyecto: ${error}`);
    }
  }

  async getEstadisticas(): Promise<ApiResponse<{ estado: string; count: number }[]>> {
    try {
      const estadisticas = await this.proyectoRepository.countByEstado();
      return {
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: estadisticas
      };
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error}`);
    }
  }
}