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

  @Column({ length: 10, default: 'client' })
  role: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: string;

  @Column()
  status: boolean;

  @Column({ default: new Date().toISOString() })
  updatedAt: string;
}
