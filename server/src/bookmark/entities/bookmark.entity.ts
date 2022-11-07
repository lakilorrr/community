import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('funbookmark')
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  name: string;

  @Column({ type: 'tinyint', default: 1 })
  public: number;

  @ManyToMany(() => Post, post => post.bookmarks)
  @JoinTable()
  posts: Post[];

  @ManyToOne(() => FunUser, user => user.bookmarks)
  author: FunUser;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
