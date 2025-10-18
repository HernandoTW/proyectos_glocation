import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos con 30 proyectos...');

  // Limpiar datos existentes
  await prisma.proyecto.deleteMany();

  // Crear 30 proyectos de ejemplo BIEN VARIADOS
  const proyectos = await prisma.proyecto.createMany({
    data: [
      {
        nombre: 'Sistema ERP Empresarial',
        descripcion: 'Desarrollo de un sistema integral de planificación de recursos empresariales para optimizar procesos internos, gestión de inventario, contabilidad y recursos humanos.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-01-15'),
        fechaFin: new Date('2024-09-30')
      },
      {
        nombre: 'App Móvil E-Commerce',
        descripcion: 'Creación de aplicación móvil nativa para iOS y Android con carrito de compras, pasarelas de pago, seguimiento de pedidos en tiempo real y sistema de recomendaciones IA.',
        estado: 'PLANIFICACION',
        fechaInicio: new Date('2024-03-01'),
        fechaFin: new Date('2024-12-15')
      },
      {
        nombre: 'Migración Cloud AWS',
        descripcion: 'Transición completa de infraestructura on-premise a Amazon Web Services incluyendo EC2, RDS, S3 y CloudFront para mejorar escalabilidad y reducir costos operativos.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-11-01'),
        fechaFin: new Date('2024-02-28')
      },
      {
        nombre: 'Plataforma Business Intelligence',
        descripcion: 'Implementación de sistema BI con Power BI, ETL processes, dashboards ejecutivos y reportes automatizados para análisis de ventas y desempeño operacional.',
        estado: 'BLOQUEADO',
        fechaInicio: new Date('2024-02-01'),
        fechaFin: null
      },
      {
        nombre: 'Rediseño Web Corporativo',
        descripcion: 'Modernización completa del sitio web con diseño responsive, Progressive Web App, optimización SEO avanzada y sistema de gestión de contenidos headless.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-01-10'),
        fechaFin: new Date('2024-05-20')
      },
      {
        nombre: 'Sistema de Autenticación Biométrica',
        descripcion: 'Desarrollo de módulo de seguridad con reconocimiento facial, huella digital y verificación de voz para acceso multi-factor a sistemas críticos.',
        estado: 'CANCELADO',
        fechaInicio: new Date('2023-12-01'),
        fechaFin: new Date('2024-01-31')
      },
      {
        nombre: 'Chatbot IA para Soporte Cliente',
        descripcion: 'Implementación de chatbot con NLP y machine learning para atención al cliente 24/7, integrado con WhatsApp Business y página web.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-02-15'),
        fechaFin: new Date('2024-07-30')
      },
      {
        nombre: 'Sistema de Gestión de Proyectos',
        descripcion: 'Desarrollo de plataforma interna para gestión ágil de proyectos con tableros Kanban, seguimiento de tiempo, asignación de recursos y reporting.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-09-10'),
        fechaFin: new Date('2024-01-25')
      },
      {
        nombre: 'App de Delivery y Logística',
        descripcion: 'Creación de aplicación para servicio de delivery con tracking en tiempo real, optimización de rutas, notificaciones push y sistema de calificaciones.',
        estado: 'PLANIFICACION',
        fechaInicio: new Date('2024-04-01'),
        fechaFin: null
      },
      {
        nombre: 'Migración a Base de Datos NoSQL',
        descripcion: 'Transición de base de datos relacional a MongoDB para mejorar performance en consultas de grandes volúmenes de datos no estructurados.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-01-20'),
        fechaFin: new Date('2024-06-15')
      },
      {
        nombre: 'Sistema de Ciberseguridad',
        descripcion: 'Implementación de suite de seguridad con firewall de próxima generación, detección de intrusiones, SIEM y respuesta automatizada a incidentes.',
        estado: 'BLOQUEADO',
        fechaInicio: new Date('2024-03-10'),
        fechaFin: null
      },
      {
        nombre: 'Plataforma E-Learning',
        descripcion: 'Desarrollo de sistema de educación en línea con aulas virtuales, videoconferencias, evaluaciones automatizadas y certificados digitales.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-08-01'),
        fechaFin: new Date('2024-01-30')
      },
      {
        nombre: 'App de Gestión Financiera Personal',
        descripcion: 'Aplicación móvil para control de gastos, presupuestos, inversiones y planificación financiera con análisis de hábitos de consumo.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-02-28'),
        fechaFin: new Date('2024-08-15')
      },
      {
        nombre: 'Sistema de IoT para Smart Home',
        descripcion: 'Desarrollo de plataforma IoT para automatización del hogar con control de dispositivos, sensores inteligentes y integración con asistentes virtuales.',
        estado: 'PLANIFICACION',
        fechaInicio: new Date('2024-05-01'),
        fechaFin: new Date('2024-11-30')
      },
      {
        nombre: 'Migración a Microservicios',
        descripcion: 'Refactorización de arquitectura monolítica a microservicios con Docker, Kubernetes y API Gateway para mejorar escalabilidad y mantenibilidad.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-01-05'),
        fechaFin: new Date('2024-10-20')
      },
      {
        nombre: 'Sistema de Reservas Online',
        descripcion: 'Plataforma web y móvil para reservas de restaurantes, hoteles y servicios con gestión de disponibilidad, pagos online y confirmaciones automáticas.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-10-15'),
        fechaFin: new Date('2024-02-10')
      },
      {
        nombre: 'Herramienta de Marketing Automation',
        descripcion: 'Desarrollo de sistema automatizado de marketing con email marketing, segmentación de clientes, lead scoring y análisis de campañas.',
        estado: 'CANCELADO',
        fechaInicio: new Date('2023-11-20'),
        fechaFin: new Date('2024-01-15')
      },
      {
        nombre: 'Blockchain para Trazabilidad',
        descripcion: 'Implementación de solución blockchain para trazabilidad de cadena de suministro, verificación de autenticidad y smart contracts.',
        estado: 'PLANIFICACION',
        fechaInicio: new Date('2024-06-01'),
        fechaFin: null
      },
      {
        nombre: 'Sistema de Realidad Aumentada',
        descripcion: 'Desarrollo de aplicación AR para visualización de productos en 3D, try-on virtual y experiencias inmersivas de compra.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-02-10'),
        fechaFin: new Date('2024-09-05')
      },
      {
        nombre: 'Plataforma de Video Streaming',
        descripcion: 'Creación de servicio streaming con transcoding en tiempo real, CDN integration, recomendaciones personalizadas y multi-dispositivo.',
        estado: 'BLOQUEADO',
        fechaInicio: new Date('2024-03-05'),
        fechaFin: null
      },
      {
        nombre: 'Sistema de Gestión Hospitalaria',
        descripcion: 'Desarrollo de software integral para gestión de hospitales con historias clínicas electrónicas, citas, farmacia y facturación.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-01-08'),
        fechaFin: new Date('2024-12-20')
      },
      {
        nombre: 'App de Fitness y Salud',
        descripcion: 'Aplicación móvil para seguimiento de actividad física, planes de entrenamiento personalizados, nutrición y monitoreo de métricas de salud.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-07-01'),
        fechaFin: new Date('2023-12-15')
      },
      {
        nombre: 'Sistema de Reconocimiento de Imágenes',
        descripcion: 'Implementación de modelo de machine learning para clasificación y análisis de imágenes médicas con alta precisión diagnóstica.',
        estado: 'PLANIFICACION',
        fechaInicio: new Date('2024-04-15'),
        fechaFin: new Date('2024-11-10')
      },
      {
        nombre: 'Plataforma de Crowdfunding',
        descripcion: 'Desarrollo de sitio web para financiamiento colectivo con perfiles de proyectos, sistema de recompensas y procesamiento de pagos seguro.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-02-20'),
        fechaFin: new Date('2024-08-30')
      },
      {
        nombre: 'Migración a Serverless Architecture',
        descripcion: 'Transición a arquitectura serverless con AWS Lambda, API Gateway y DynamoDB para optimizar costos y mejorar escalabilidad automática.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-12-10'),
        fechaFin: new Date('2024-03-20')
      },
      {
        nombre: 'Sistema de Gestión Educativa',
        descripcion: 'Plataforma para instituciones educativas con gestión académica, calificaciones, asistencia, comunicación padres-profesores y biblioteca digital.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-01-30'),
        fechaFin: new Date('2024-07-25')
      },
      {
        nombre: 'App de Viajes y Turismo',
        descripcion: 'Aplicación integral para planificación de viajes con reservas de vuelos, hoteles, actividades y recomendaciones basadas en preferencias.',
        estado: 'BLOQUEADO',
        fechaInicio: new Date('2024-03-12'),
        fechaFin: null
      },
      {
        nombre: 'Sistema de Análisis de Sentimientos',
        descripcion: 'Desarrollo de herramienta de análisis de sentimientos en redes sociales y reseñas usando NLP para insights de marca y competencia.',
        estado: 'PLANIFICACION',
        fechaInicio: new Date('2024-05-10'),
        fechaFin: new Date('2024-10-05')
      },
      {
        nombre: 'Plataforma de Comercio B2B',
        descripcion: 'Marketplace empresarial para transacciones B2B con catálogo de productos, cotizaciones, órdenes de compra y gestión de proveedores.',
        estado: 'EN_PROGRESO',
        fechaInicio: new Date('2024-02-05'),
        fechaFin: new Date('2024-09-15')
      },
      {
        nombre: 'Sistema de Gestión de Flota',
        descripcion: 'Software para gestión de flota vehicular con tracking GPS, mantenimiento predictivo, optimización de rutas y análisis de consumo.',
        estado: 'FINALIZADO',
        fechaInicio: new Date('2023-08-20'),
        fechaFin: new Date('2024-01-10')
      }
    ]
  });

  console.log(`✅ ${proyectos.count} proyectos creados exitosamente`);
  console.log('📊 Distribución de estados:');
  
  const counts = await prisma.proyecto.groupBy({
    by: ['estado'],
    _count: {
      estado: true
    }
  });

  counts.forEach(item => {
    console.log(`   ${item.estado}: ${item._count.estado} proyectos`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });