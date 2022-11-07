import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { PostToBookmarkDto } from './dto/post-to-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}
  async create(user: FunUser, createBookmarkDto: CreateBookmarkDto) {
    const newBookmark = { ...createBookmarkDto, author: user };
    return await this.bookmarkRepo.save(newBookmark);
  }

  async findAll() {
    return await this.bookmarkRepo.find();
  }

  async findAllByUser(id: number, isAdmin: boolean) {
    if (isAdmin) {
      return await this.bookmarkRepo.find({
        where: { author: { id: id } },
      });
    } else {
      return await this.bookmarkRepo.find({
        where: { author: { id: id }, public: 1 },
      });
    }
  }

  async findOneByUser(userId: number, bookemarkId: number) {
    const query = this.bookmarkRepo
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.posts', 'post')
      .leftJoinAndSelect('post.pictures', 'picture')
      .leftJoinAndSelect('post.topic', 'topic')
      .where('bookmark.id=:id', { id: bookemarkId });
    const bookemarkExist = await query.getOne();
    if (!bookemarkExist) throw new NotFoundException('收藏夹不存在');
    const isMyBookmark = await query
      .andWhere('bookmark.author.id=:userId', { userId: userId })
      .orderBy('post.updateDate', 'DESC')
      .select(['post.id', 'post.content'])
      .getOne();
    if (isMyBookmark) {
      return isMyBookmark;
    } else {
      const publicBookmark = await query
        .andWhere('bookmark.public=:public', { public: 1 })
        .orderBy('post.updateDate', 'DESC')
        .select(['post.id', 'post.content'])
        .getOne();
      return publicBookmark;
    }
  }

  async update(
    userId: number,
    updateBookmarkDto: UpdateBookmarkDto,
    bookemarkId: number,
  ) {
    const bookmark = await this.findOneByUser(userId, bookemarkId);
    const update = this.bookmarkRepo.merge(bookmark, updateBookmarkDto);
    return await this.bookmarkRepo.save(update);
  }

  async remove(userId: number, bookemarkId: number) {
    const bookmark = await this.findOneByUser(userId, bookemarkId);
    await this.bookmarkRepo.remove(bookmark);
    return true;
  }

  async post(user: FunUser, postToBookmarkDto: PostToBookmarkDto) {
    const post = await this.postRepo.findBy({
      id: postToBookmarkDto.post,
    });
    if (post.length === 0) throw new NotFoundException('找不到该动态');
    if (postToBookmarkDto.bookmark) {
      const query = this.bookmarkRepo
        .createQueryBuilder('bookmark')
        .where('bookmark.id=:id', { id: postToBookmarkDto.bookmark });
      const ownQuery = query
        .innerJoin('bookmark.author', 'user')
        .where('user.id=:userId', { userId: user.id });
      if (!ownQuery.getOne()) throw new NotFoundException('找不到该收藏夹');
      const bookmarkExist = await ownQuery
        .innerJoin('bookmark.posts', 'post')
        .where('post.id=:postId', { postId: postToBookmarkDto.post })
        .getOne();
      if (bookmarkExist) {
        // TODO: 创建关联表
        await this.bookmarkRepo.remove(bookmarkExist);
        return '取消收藏成功';
      } else {
        bookmarkExist.posts.push(...post);
        return await this.bookmarkRepo.save(bookmarkExist);
      }
    } else {
      const queryDefault = this.bookmarkRepo
        .createQueryBuilder('bookmark')
        .where('bookmark.name=:name', { name: '默认收藏夹' });
      if (queryDefault.getOne()) {
        const postExist = queryDefault
          .innerJoin('bookmark.posts', 'post')
          .where('post.id=:postId', { postId: postToBookmarkDto.post })
          .getOne();
      } else {
        const defaultBookmark = new Bookmark();
        defaultBookmark.author = user;
        defaultBookmark.posts = post;
        defaultBookmark.name = '默认收藏夹';
        return await this.bookmarkRepo.save(defaultBookmark);
      }
    }
  }
}
