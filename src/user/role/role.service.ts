import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from '../permission/permission.repository';

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRespository: PermissionRepository,
  ) {}

  async createNewRole(newRoleDetails: {
    name: string;
    description: string;
  }): Promise<Role> {
    const newRole = this.roleRepository.createRole(newRoleDetails);
    return newRole;
  }

  async getAllRoles(): Promise<Role[]> {
    const allRoles = this.roleRepository.find();
    return allRoles;
  }

  async updateRole(roleDetails: {
    name: string;
    description: string;
    permissions?: string[];
  }): Promise<Role> {
    const selectedRole = await this.roleRepository.findOne({
      where: { name: roleDetails.name },
    });
    const permissionsArray = [];

    for (const p of roleDetails.permissions) {
      const selectedPermission = await this.permissionRespository.findOne({
        where: { name: p },
      });
      permissionsArray.push(selectedPermission);
    }
    selectedRole.description = roleDetails.description;
    selectedRole.permissions = permissionsArray;

    await selectedRole.save();

    return selectedRole;
  }
}
