import { File } from 'src/files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    name: 'full_name',
  })
  fullName: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
