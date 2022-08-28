import { Injectable } from '@nestjs/common';
import { CustomRepository } from 'src/config/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@CustomRepository(Role)
export class RoleRepository extends Repository<Role> {
  async createRole(roleDetails: {
    name: string;
    description: string;
  }): Promise<Role> {
    const newRole = new Role();
    newRole.name = roleDetails.name;
    newRole.description = roleDetails.description;
    await newRole.save();
    return newRole;
  }
}
