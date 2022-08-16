import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() data: UserCreateDto): Promise<any> {
    return this.userService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UserUpdateDto,
  ): Promise<any> {
    await this.userService.update(id, data);

    return { message: 'User updated' };
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return this.userService.destroy(id);
  }
}
