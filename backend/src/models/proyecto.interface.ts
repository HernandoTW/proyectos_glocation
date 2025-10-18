// Usa el enum generado por Prisma en lugar de crear uno propio
import { Estado as PrismaEstado } from '@prisma/client';

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: PrismaEstado;
  fechaInicio: Date;
  fechaFin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Re-exportar el enum de Prisma para usarlo en toda la app
export { PrismaEstado as Estado };

export interface CreateProyectoDto {
  nombre: string;
  descripcion: string;
  estado: PrismaEstado;
  fechaInicio: Date;
  fechaFin?: Date;
}

export interface UpdateProyectoDto extends Partial<CreateProyectoDto> {}