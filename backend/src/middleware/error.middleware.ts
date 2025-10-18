import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🚨 Error:', error);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.path}`
  });
};