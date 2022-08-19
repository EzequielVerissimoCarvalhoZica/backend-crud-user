import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ILoginBody from 'src/types/interfaces/ILoginBody';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === pass && user.role === 'admin') {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: ILoginBody) {
    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
