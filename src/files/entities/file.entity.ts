import { UUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'file_name',
  })
  fileName: string;

  @Column({
    name: 'original_name',
  })
  originalName: string;

  @Column()
  size: number;

  @Column({
    name: 'mime_type',
  })
  mimeType: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.files)
  user: User;
}
