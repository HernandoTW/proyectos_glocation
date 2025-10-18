import { PrismaClient } from '@prisma/client';
import { Proyecto, CreateProyectoDto, UpdateProyectoDto } from '../models/proyecto.interface';

const prisma = new PrismaClient();

export class ProyectoRepository {
  async findAll(): Promise<Proyecto[]> {
    const proyectos = await prisma.proyecto.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return proyectos as Proyecto[];
  }

  async findById(id: number): Promise<Proyecto | null> {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id }
    });
    return proyecto as Proyecto | null;
  }

  async create(data: CreateProyectoDto): Promise<Proyecto> {
    const proyecto = await prisma.proyecto.create({
      data
    });
    return proyecto as Proyecto;
  }

  async update(id: number, data: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await prisma.proyecto.update({
      where: { id },
      data
    });
    return proyecto as Proyecto;
  }

  async delete(id: number): Promise<Proyecto> {
    const proyecto = await prisma.proyecto.delete({
      where: { id }
    });
    return proyecto as Proyecto;
  }

  async countByEstado(): Promise<{ estado: string; count: number }[]> {
    const result = await prisma.proyecto.groupBy({
      by: ['estado'],
      _count: {
        estado: true
      }
    });

    return result.map(item => ({
      estado: item.estado,
      count: item._count.estado
    }));
  }

  async getProjectDescriptions(): Promise<string[]> {
    const proyectos = await prisma.proyecto.findMany({
      select: { descripcion: true }
    });
    return proyectos.map(p => p.descripcion);
  }
}