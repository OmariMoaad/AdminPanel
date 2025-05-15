import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateApplicationDto) {
    return this.prisma.application.create({ data });
  }

  findAll() {
    return this.prisma.application.findMany();
  }

  findOne(id: number) {
    return this.prisma.application.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateApplicationDto) {
    return this.prisma.application.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.application.delete({ where: { id } });
  }
}
