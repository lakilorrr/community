import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LikeDto } from './dto/like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async createOrRemove(LikeDto: LikeDto, user: FunUser) {
    const likeExist = await this.likeRepo.findOne({
      where: { post: { id: LikeDto.post }, author: { id: user.id } },
    });
    if (likeExist) {
      await this.likeRepo.remove(likeExist);
      return 0;
    } else {
      const post = await this.postRepo.findOne({
        where: { id: LikeDto.post },
      });
      if (post) {
        const newLike = new Like();
        newLike.post = post;
        newLike.author = user;
        await this.likeRepo.save(newLike);
        return 1;
      } else {
        throw new NotFoundException('找不到该动态');
      }
    }
  }

  async findAllByUser(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (user) {
      return await this.likeRepo
        .createQueryBuilder('like')
        .innerJoin('like.author', 'user')
        .leftJoinAndSelect('like.post', 'post')
        .leftJoinAndSelect('post.pictures', 'picture')
        .leftJoinAndSelect('post.topic', 'topic')
        .leftJoinAndSelect('post.author', 'post_author')
        .leftJoinAndSelect('post.likes', 'post_like')
        .leftJoinAndSelect('post_like.author', 'post_like_author')
        .loadRelationCountAndMap('post.comment_count', 'post.comments')
        .loadRelationCountAndMap('post.like_count', 'post.likes')
        .where('user.id=:id', { id: userId })
        .orderBy('like.createDate', 'DESC')
        .getMany();
    } else {
      throw new NotFoundException('找不到该用户');
    }
  }
}
