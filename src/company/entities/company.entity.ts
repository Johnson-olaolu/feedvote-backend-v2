import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    nullable: false,
  })
  name: string;
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;
  @Column()
  address: string;

  @Column()
  invites: string[];

  @Column()
  logo: string;

  @OneToOne(() => User)
  owner: User;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  // @OneToMany(() =>)
  // feeds Feed[] [ref: > Feed.id]
}
