import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        userId: data.userId,
        applicationId: data.applicationId,
        role: data.role,
      },
    });
  }

  findAll() {
    return this.prisma.permission.findMany();
  }

  findOne(id: number) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  update(id: number, data: UpdatePermissionDto) {
    return this.prisma.permission.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
