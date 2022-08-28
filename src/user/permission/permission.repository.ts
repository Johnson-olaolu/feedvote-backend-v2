import { CustomRepository } from 'src/config/db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@CustomRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  async createPermission(permissionDetails: {
    name: string;
    description: string;
  }) {
    const newPermission = new Permission();
    newPermission.name = permissionDetails.name;
    newPermission.description = permissionDetails.description;

    await newPermission.save();
    return newPermission;
  }
}
