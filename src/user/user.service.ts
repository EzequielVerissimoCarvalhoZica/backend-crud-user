import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(data: UserCreateDto): Promise<any> {
    const result = await this.userRepository.findBy({ email: data.email });

    if (result.length > 0) throw new ConflictException('Email already exists');

    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;
    user.role = data.role;
    user.dateOfBirth = data.dateOfBirth;
    user.phoneNumber = data.phoneNumber;
    user.status = data.status || true;
    user.updatedAt = data.updatedAt || new Date().toISOString();

    const { password, ...userCreated } = await this.userRepository.save(user);
    return userCreated;
  }

  async update(id: string, data: UserUpdateDto): Promise<any> {
    if (data.email) {
      const result = await this.userRepository.findOneBy({ email: data.email });

      if (result && result.id !== Number(id))
        throw new ConflictException('Email already exists');
    }

    const newData = {
      ...data,
      updatedAt: data.updatedAt || new Date().toISOString(),
    };

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(newData)
      .where('id = :id', { id })
      .execute();
  }

  async destroy(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');

    return { deleted: true };
  }
}
