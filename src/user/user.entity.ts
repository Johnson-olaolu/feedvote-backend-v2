import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { Role } from './role/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  profile_image: string;

  @ManyToOne(() => Role, {
    nullable: false,
    eager: true,
  })
  role: Role;

  @Column({
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async comparePasswords(password: string): Promise<boolean> {
    const result = await bcrypt.compareSync(this.password, password);
    return result;
  }
}
