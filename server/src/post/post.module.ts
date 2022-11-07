import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Picture } from 'src/picture/entities/picture.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { UserTopicState } from 'src/user/entities/userTopicState.entity';
import { UserModule } from 'src/user/user.module';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      Picture,
      Topic,
      UserTopicState,
      Like,
      Comment,
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
