import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Proyectos',
      version: '1.0.0',
      description: 'API REST para gestión de proyectos con integración de IA',
      contact: {
        name: 'Soporte API',
        email: 'soporte@empresa.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Proyecto: {
          type: 'object',
          required: ['nombre', 'descripcion', 'estado', 'fechaInicio'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID autoincremental del proyecto'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del proyecto',
              example: 'Sistema de Gestión'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada del proyecto',
              example: 'Desarrollo de un sistema integral de gestión empresarial'
            },
            estado: {
              type: 'string',
              enum: ['PLANIFICACION', 'EN_PROGRESO', 'BLOQUEADO', 'FINALIZADO', 'CANCELADO'],
              description: 'Estado actual del proyecto'
            },
            fechaInicio: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de inicio del proyecto'
            },
            fechaFin: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de finalización del proyecto',
              nullable: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del registro'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indica si la operación fue exitosa'
            },
            message: {
              type: 'string',
              description: 'Mensaje descriptivo del resultado'
            },
            data: {
              type: 'object',
              description: 'Datos de respuesta',
              nullable: true
            },
            error: {
              type: 'string',
              description: 'Mensaje de error en caso de fallo',
              nullable: true
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger disponible en: http://localhost:3000/api-docs');
};