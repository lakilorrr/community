import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Post])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
