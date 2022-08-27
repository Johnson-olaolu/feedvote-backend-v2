import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userOrEmail: string, password: string) {
    const user = await this.userService.findUser(userOrEmail);

    if (user && user.comparePasswords(password)) {
      return user;
    }
    return null;
  }

  async loginUser(user: User) {
    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const user = await this.userService.createUser(registerUserDto);
    return this.loginUser(user);
  }
}
