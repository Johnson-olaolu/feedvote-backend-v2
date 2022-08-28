import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import { PermissionRepository } from 'src/user/permission/permission.repository';
import { RoleRepository } from 'src/user/role/role.repository';
import { PermissionSeed } from 'src/user/seed/permission.seed';
import { RoleSeed } from 'src/user/seed/role.seed';
import { UserSeed } from 'src/user/seed/user.seed';
import { UserModule } from 'src/user/user.module';
import { UserRespository } from 'src/user/user.repository';

@Module({
  imports: [
    CommandModule,
    UserModule,
    TypeOrmModule.forFeature([
      RoleRepository,
      PermissionRepository,
      UserRespository,
    ]),
  ],
  providers: [RoleSeed, PermissionSeed, UserSeed],
  exports: [RoleSeed, PermissionSeed, UserSeed],
})
export class SeedModule {}
