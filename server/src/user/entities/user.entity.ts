import { hashSync } from 'bcryptjs';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Picture } from 'src/picture/entities/picture.entity';
import { Post } from 'src/post/entities/post.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserTopicState } from './userTopicState.entity';

@Entity('funuser')
export class FunUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  name: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({
    type: 'varchar',
    default: './public/avatar/default.jpg',
    charset: 'utf8mb4',
  })
  avatar: string;

  @Column({ type: 'enum', enum: ['root', 'operator', 'user'], default: 'user' })
  role: string;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hashSync(this.password);
  }

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Like, like => like.author)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Post, post => post.author)
  post: Post[];

  @OneToMany(() => Bookmark, bookmark => bookmark.author)
  bookmarks: Bookmark[];

  @OneToMany(() => Picture, picture => picture.author)
  pictures: Picture[];

  @OneToMany(() => Topic, topic => topic.host)
  topics_operator: Topic[];

  @ManyToMany(() => Topic, topic => topic.participants)
  @JoinTable()
  topics_user: Topic[];

  @OneToMany(() => UserTopicState, state => state.user)
  topic_states: UserTopicState[];
}
