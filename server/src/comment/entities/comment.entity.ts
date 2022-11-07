import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('funcomment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  content: string;

  @OneToOne(() => Comment)
  @JoinColumn()
  reply_to: Comment;

  @ManyToOne(() => FunUser, user => user.comments)
  author: FunUser;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
