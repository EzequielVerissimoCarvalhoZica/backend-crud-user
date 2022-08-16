import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body() data: UserCreateDto): Promise<any> {
    return this.userService.create(data);
  }
}
