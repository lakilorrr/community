import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('funpicture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  path: string;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  originalname: string;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  filename: string;

  @Column({ type: 'int' })
  size: number;

  @ManyToOne(() => FunUser, user => user.pictures)
  author: FunUser;

  @ManyToOne(() => Post, post => post.pictures, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
