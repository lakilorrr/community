import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { FunUser } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: FunUser) {
    const newComment = new Comment();
    const { postId, replyId, content } = createCommentDto;
    const post = await this.postRepo.findOne({
      where: { id: postId },
    });
    if (post) {
      if (replyId) {
        const replyComment = await this.commentRepo.findOne({
          where: { id: replyId },
        });
        if (!replyComment) throw new NotFoundException('找不到该评论');
        newComment.reply_to = replyComment;
      }
      newComment.post = post;
      newComment.author = user;
      newComment.content = content;
      return await this.commentRepo.save(newComment);
    } else {
      throw new NotFoundException('找不到该动态');
    }
  }

  async findAllByUser(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (user) {
      return await this.commentRepo
        .createQueryBuilder('comment')
        .innerJoinAndSelect('comment.author', 'user')
        .where('user.id=:id', { id: userId })
        .leftJoinAndSelect('comment.post', 'post')
        .leftJoinAndSelect('post.pictures', 'picture')
        .leftJoinAndSelect('post.author', 'post_author')
        .leftJoinAndSelect('post.likes', 'post_like')
        .leftJoinAndSelect('post_like.author', 'post_like_author')
        .loadRelationCountAndMap('post.comment_count', 'post.comments')
        .loadRelationCountAndMap('post.like_count', 'post.likes')
        .leftJoinAndSelect('post.topic', 'topic')
        .orderBy('comment.createDate', 'DESC')
        .getMany();
    }
  }
  async findAllByPost(postId: number) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (post) {
      return await this.commentRepo
        .createQueryBuilder('comment')
        .innerJoin('comment.author', 'user')
        .select([
          'user.name',
          'user.avatar',
          'comment.id',
          'comment.content',
          'comment.reply_to',
          'comment.createDate',
        ])
        .getMany();
    } else {
      throw new NotFoundException('找不到该动态');
    }
  }
  async findOneByUser(userId: number, commentId: number) {
    const comment = await this.commentRepo.findOne({
      where: { author: { id: userId }, id: commentId },
    });
    if (comment) {
      return comment;
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(userId: number, commentId: number) {
    const comment = await this.findOneByUser(userId, commentId);
    await this.commentRepo.remove(comment);
    return true;
  }
}
