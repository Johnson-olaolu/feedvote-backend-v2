import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from './role/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRespository extends Repository<User> {
  async createUser(userDetails: {
    name: string;
    email: string;
    profile_img?: string;
    password: string;
    address: string;
    role: Role;
  }) {
    const newUser = new User();
    newUser.name = userDetails.name;
    newUser.email = userDetails.email;
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(userDetails.password, salt);
    newUser.role = userDetails.role;
    await newUser.save();
    return newUser;
  }
}
