import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './utils/config';
import { setupSwagger } from './utils/swagger';
import { requestLogger, corsMiddleware } from './middleware/logging.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import proyectoRoutes from './routes/proyecto.routes';
import analyticsRoutes from './routes/analytics.routes';

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(compression());
app.use(corsMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiadas requests desde esta IP, intenta nuevamente en 15 minutos'
  }
});
app.use(limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(requestLogger);

// Routes
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 API de Gestión de Proyectos funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV
  });
});

// Swagger documentation
setupSwagger(app);

// Manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(config.PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
  console.log(`Health check: http://localhost:${config.PORT}/health`);
  console.log(`Documentación: http://localhost:${config.PORT}/api-docs`);
});

export default app;