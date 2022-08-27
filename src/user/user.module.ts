import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from './permission/permission.repository';
import { PermissionService } from './permission/permission.service';
import { Role } from './role/role.entity';
import { RoleRepository } from './role/role.repository';
import { RoleService } from './role/role.service';
import { UserController } from './user.controller';
import { UserRespository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleRepository,
      UserRespository,
      PermissionRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleService, UserService, PermissionService],
})
export class UserModule {}
