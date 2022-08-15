import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column('text')
  status: string;

  @Column()
  updatedAt: string;
}
