import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateApplicationDto): Promise<Application> {
    return this.prisma.application.create({ data });
  }

  findAll(): Promise<Application[]> {
    return this.prisma.application.findMany();
  }

  findOne(id: number): Promise<Application | null> {
    return this.prisma.application.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateApplicationDto): Promise<Application> {
    return this.prisma.application.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Application> {
    return this.prisma.application.delete({
      where: { id },
    });
  }
}
