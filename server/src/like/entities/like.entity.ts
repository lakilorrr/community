import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('funlike')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FunUser, user => user.likes)
  author: FunUser;

  @ManyToOne(() => Post, post => post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
