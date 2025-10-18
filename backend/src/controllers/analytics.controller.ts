import { Request, Response } from 'express';
import { ProyectoService } from '../services/proyecto.service';
import { ProyectoRepository } from '../repositories/proyecto.repository';
import { AIService } from '../services/ai.service';

const proyectoService = new ProyectoService();
const proyectoRepository = new ProyectoRepository();
const aiService = new AIService();

export class AnalyticsController {
  async getEstadisticas(req: Request, res: Response) {
    try {
      const result = await proyectoService.getEstadisticas();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  async generarAnalisisIA(req: Request, res: Response) {
    try {
      const descripciones = await proyectoRepository.getProjectDescriptions();
      
      let resumen: string;
      if (!process.env.DEEPSEEK_API_KEY) {
        resumen = aiService.generarResumenFallback(descripciones);
      } else {
        resumen = await aiService.generarResumenProyectos(descripciones);
      }

      res.status(200).json({
        success: true,
        message: 'Análisis generado exitosamente',
        data: {
          resumen,
          totalProyectosAnalizados: descripciones.length,
          fuente: process.env.DEEPSEEK_API_KEY ? 'DeepSeek AI' : 'Análisis básico'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al generar análisis con IA',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}