import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from 'nestjs-command';
import { RoleRepository } from '../role/role.repository';
import { UserRespository } from '../user.repository';
@Injectable()
export class UserSeed {
  constructor(
    @InjectRepository(UserRespository) private userRepository: UserRespository,
    @InjectRepository(RoleRepository) private roleRepository: RoleRepository,
  ) {}

  @Command({
    command: 'create:superAdmin',
    describe: 'create super admin for the website',
  })
  async seedSuperAdmin() {
    const superAdminRole = await this.roleRepository.findOne({
      where: {
        name: 'SuperAdmin',
      },
    });
    const superAdminDetails = {
      name: 'super-admin',
      email: 'johnsonolaolu@gmail.com',
      password: 'super-admin',
      userName: 'admin',
      role: superAdminRole,
    };

    const superAdmin = await this.userRepository.createUser(superAdminDetails);
    console.log(superAdmin);
  }
}
