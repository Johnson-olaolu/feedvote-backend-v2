import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../role/role.repository';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    private permissionRepository: PermissionRepository,
    private roleRepisotory: RoleRepository,
  ) {}

  async createPermisssion(permissionDetails: {
    name: string;
    description: string;
  }): Promise<Permission> {
    const newPermission = await this.permissionRepository.createPermission(
      permissionDetails,
    );
    return newPermission;
  }

  async getAllPermisssions(): Promise<Permission[]> {
    const permissions = await this.permissionRepository.find();
    return permissions;
  }

  async updatePermission(
    permissionId: number,
    permissionDetails: {
      name?: string;
      description: string;
    },
  ) {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });
    if (permissionDetails.name) {
      permission.name = permissionDetails.name;
    }
    if (permissionDetails.description) {
      permission.description = permissionDetails.description;
    }

    await permission.save();

    return permission;
  }
}
