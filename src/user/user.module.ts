import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/config/db/typeorm-ex.module';
import { PermissionRepository } from './permission/permission.repository';
import { PermissionService } from './permission/permission.service';
import { RoleRepository } from './role/role.repository';
import { RoleService } from './role/role.service';
import { UserController } from './user.controller';
import { UserRespository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      RoleRepository,
      UserRespository,
      PermissionRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleService, UserService, PermissionService],
  exports: [UserService, RoleService, PermissionService, TypeOrmExModule],
})
export class UserModule {}
