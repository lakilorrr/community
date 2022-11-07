import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { Like } from './entities/like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Like]), UserModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
