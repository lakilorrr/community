import { Topic } from 'src/topic/entities/topic.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FunUser } from './user.entity';

@Entity('funusertopicstate')
export class UserTopicState {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ type: 'tinyint', default: 1 })
  state: number;

  @ManyToOne(() => Topic, topic => topic.participants_states)
  topic: Topic;

  @ManyToOne(() => FunUser, user => user.topic_states)
  user: FunUser;
}
