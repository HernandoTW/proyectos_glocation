import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Esquemas de validación con Zod
const createProyectoSchema = z.object({
  nombre: z.string().min(1, 'Nombre es requerido').max(100, 'Nombre muy largo'),
  descripcion: z.string().min(1, 'Descripción es requerida').max(500, 'Descripción muy larga'),
  estado: z.enum(['PLANIFICACION', 'EN_PROGRESO', 'BLOQUEADO', 'FINALIZADO', 'CANCELADO']),
  fechaInicio: z.string().datetime('Fecha de inicio inválida'),
  fechaFin: z.string().datetime('Fecha de fin inválida').optional().nullable()
});

const updateProyectoSchema = createProyectoSchema.partial();

export const validateCreateProyecto = (req: Request, res: Response, next: NextFunction) => {
  try {
    createProyectoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    } else {
      next(error);
    }
  }
};

export const validateUpdateProyecto = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateProyectoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    } else {
      next(error);
    }
  }
};

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'ID debe ser un número positivo válido'
    });
  }
  next();
};