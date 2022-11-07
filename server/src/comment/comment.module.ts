import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post]), UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
