import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePermissionDto) {
    return this.prisma.permission.create({ data });
  }

  findAll() {
    return this.prisma.permission.findMany({
      include: {
        user: true,
        application: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.permission.findUnique({
      where: { id },
      include: {
        user: true,
        application: true,
      },
    });
  }

  update(id: number, data: UpdatePermissionDto) {
    return this.prisma.permission.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
