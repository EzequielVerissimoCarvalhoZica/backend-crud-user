import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import ILoginBody from 'src/types/interfaces/ILoginBody';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users.filter((user) => user.email !== 'adm@admin.com');
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: UserCreateDto): Promise<any> {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UserUpdateDto,
  ): Promise<any> {
    await this.userService.update(id, data);
    const { password, ...user } = data;

    return { updated: true, user };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return this.userService.destroy(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: ILoginBody) {
    return this.authService.login(data);
  }
}
