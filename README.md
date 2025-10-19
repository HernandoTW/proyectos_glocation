# proyectos_glocation
Desarrollo para prueba tecnica vacante desarrollador node.js GLocation


# SISTEMA PARA GESTION DE PROYECTOS #

Descripción
Sistema completo de gestión de proyectos desarrollado con Node.js, React, PostgreSQL e IA generativa. Permite crear, visualizar, actualizar y eliminar proyectos, además de generar análisis inteligentes y reportes gráficos.


# ------------- CARACTERISTICAS ------------- #

Backend (Node.js + Express):
- API REST completa con operaciones CRU
- Base de datos PostgreSQL con Prisma ORM
- Validaciones con Zod
- Documentación Swagger/OpenAPI
- Integración con IA (DeepSeek API)
- Manejo de errores profesional
- Arquitectura por capas (Controller > Service > Repository)

Frontend (React + TypeScript)
- Interfaz responsiva para desktop y móvil
- Tablas dinámicas con paginación
- Gráficos interactivos con Chart.js
- Formularios modales para CRUD
- Análisis con IA en tiempo real
- Estilos modernos sin frameworks CSS

Base de Datos
- PostgreSQL con modelo relacional
- Prisma ORM para type-safe queries
- 30 proyectos de ejemplo con datos reales
- Migraciones automatizadas


# ------------- STACK TECNOLÓGICO ------------- #

Backend
* Node.js + Express + TypeScript
* PostgreSQL + Prisma ORM
* Zod para validaciones
* Swagger para documentación
* DeepSeek API para IA generativa

Frontend
* React 18 + TypeScript
* Vite como build tool
* Chart.js + React-Chartjs-2
* Axios para HTTP requests
* CSS vanilla responsivo


# ------------- INSTALACION Y CONFIGURACION ------------- #

Prerrequisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn

1. Clonar y Configurar Backend (bash)
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
Editar .env con tu configuración:

env
DATABASE_URL="postgresql://usuario:password@localhost:5432/proyectos_glocation"
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
DEEPSEEK_API_KEY=tu_api_key_opcional

2. Configurar Base de Datos (bash)
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# IMPORTANTE: Ejecutar seed con 30 proyectos
npm run db:seed

3. Iniciar Backend (bash)
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start
El backend estará en: http://localhost:3000

4. Configurar Frontend (bash)
# En otra terminal, navegar al frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
El frontend estará en: http://localhost:5173


# ------------- USO DE LA APLICACION ------------- #

Dashboard Principal
* Resumen visual de proyectos por estado
* Gráfico circular interactivo
* Estadísticas en tiempo real

Gestión de Proyectos
* Crear proyecto: Botón "Nuevo Proyecto"
* Editar proyecto: Botón "Editar" en cada fila
* Eliminar proyecto: Botón "Eliminar" con confirmación
* Campos: nombre, descripción, estado, fechas

Análisis con IA
* Generar resumen: Botón "Generar Análisis"
* Análisis ejecutivo de todos los proyectos
* Funciona sin API key (modo básico)

Documentación API

Endpoints Disponibles

Proyectos
text
GET    /api/proyectos          # Listar todos los proyectos
GET    /api/proyectos/:id      # Obtener proyecto por ID
POST   /api/proyectos          # Crear nuevo proyecto
PUT    /api/proyectos/:id      # Actualizar proyecto
DELETE /api/proyectos/:id      # Eliminar proyecto

Analytics
text
GET    /api/analytics/graficos # Datos para gráficos
POST   /api/analytics/analisis # Generar análisis con IA

Health Check
text
GET    /health                 # Estado del servidor


Ejemplos de Uso

Crear Proyecto: (bash)
curl -X POST http://localhost:3000/api/proyectos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Mi Proyecto",
    "descripcion": "Descripción del proyecto",
    "estado": "EN_PROGRESO",
    "fechaInicio": "2024-01-15T00:00:00.000Z"
  }'

Obtener Proyectos: (bash)
curl http://localhost:3000/api/proyectos


# ------------- Modelo de Datos ------------- #

Esquema Proyecto

prisma
model Proyecto {
  id          Int      @id @default(autoincrement())
  nombre      String   @unique
  descripcion String
  estado      Estado
  fechaInicio DateTime
  fechaFin    DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Estado {
  PLANIFICACION
  EN_PROGRESO
  BLOQUEADO
  FINALIZADO
  CANCELADO
}

Seed de Datos
El proyecto incluye 30 proyectos de ejemplo con datos realistas:
- 10 proyectos En Progreso
- 6 proyectos Planificación
- 6 proyectos Finalizados
- 5 proyectos Bloqueados
- 3 proyectos Cancelados

Ejecutar seed: (bash)
npm run db:seed


# ------------- Docker (Próximamente) ------------- #

Despliegue (bash)
# Próxima implementación
docker-compose up --build


# ------------- Scripts Disponibles ------------- #

Backend (bash)
npm run dev          # Desarrollo con hot-reload
npm run build        # Compilar TypeScript
npm run start        # Producción
npm run db:seed      # Ejecutar seed de 30 proyectos
npm run db:studio    # Abrir Prisma Studio

Frontend (bash)
npm run dev          # Servidor desarrollo Vite
npm run build        # Build producción
npm run preview      # Preview build


# ------------- Autor ------------- #
Hernando Arenas Lambis - GitHub Profile https://github.com/HernandoTW


# ------------- Estado del Proyecto ------------- #
COMPLETADO - Todas las funcionalidades implementadas y probadas.