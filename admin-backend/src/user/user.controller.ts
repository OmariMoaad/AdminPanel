import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  async create(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UserModel,
  ): Promise<UserModel> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.delete(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserModel> {
    const user = await this.userService.login(loginDto.email);
    if (!user) {
      throw new NotFoundException(
        `User with email ${loginDto.email} not found`,
      );
    }
    return user;
  }
}
