import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTopicState } from 'src/user/entities/userTopicState.entity';
import { UserModule } from 'src/user/user.module';
import { Topic } from './entities/topic.entity';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, UserTopicState]), UserModule],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
