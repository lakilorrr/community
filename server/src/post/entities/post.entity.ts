import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Picture } from 'src/picture/entities/picture.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { FunUser } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('funpost')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  content: string;

  @Column({ type: 'enum', enum: ['draft', 'public'], default: 'public' })
  state: string;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Picture, picture => picture.post)
  pictures: Picture[];

  @ManyToOne(() => FunUser, user => user.post)
  @JoinColumn({ name: 'author_id' })
  author: FunUser;

  @ManyToMany(() => Bookmark, bookmark => bookmark.posts)
  bookmarks: Bookmark[];

  @ManyToOne(() => Topic, topic => topic.posts)
  topic: Topic;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
