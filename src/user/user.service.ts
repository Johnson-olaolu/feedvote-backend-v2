import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PermissionRepository } from './permission/permission.repository';
import { RoleRepository } from './role/role.repository';
import { User } from './user.entity';
import { UserRespository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRespository,
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async getSingleUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  async findUser(userOrEmail: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: userOrEmail }, { userName: userOrEmail }],
    });
    return user;
  }

  async createUser(userDetails: {
    email: string;
    name: string;
    password: string;
    role_name: string;
    userName?: string;
  }): Promise<User> {
    const { email, name, password, role_name } = userDetails;
    const role = await this.roleRepository.findOne({
      where: { name: role_name },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const newUser = await this.userRepository.createUser({
      email: email,
      name: name,
      password: password,
      role: role,
    });
    return newUser;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    for (const key in updateUserDto) {
      user[key] = updateUserDto[key];
    }
    await user.save();
    return user;
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(userId);
  }
}
