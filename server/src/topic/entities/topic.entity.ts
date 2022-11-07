import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import { UserTopicState } from 'src/user/entities/userTopicState.entity';
import {
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('funtopic')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', charset: 'utf8mb4' })
  name: string;

  @Column({ type: 'int', default: 0 })
  participants_count: number;

  @OneToMany(() => Post, post => post.topic)
  posts: Post[];

  @ManyToOne(() => FunUser, user => user.topics_operator)
  host: FunUser;

  @ManyToMany(() => FunUser, user => user.topics_user)
  participants: FunUser[];

  @OneToMany(() => UserTopicState, state => state.topic)
  participants_states: UserTopicState[];

  @AfterUpdate()
  count() {
    this.participants_count = this.participants.length;
  }

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
