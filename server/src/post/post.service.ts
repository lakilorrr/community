import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { validateIds } from 'src/core/decorator/paramIds.decorator';
import { Like } from 'src/like/entities/like.entity';
import { Picture } from 'src/picture/entities/picture.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { FunUser } from 'src/user/entities/user.entity';
import { UserTopicState } from 'src/user/entities/userTopicState.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(UserTopicState)
    private readonly userTopicStateRepo: Repository<UserTopicState>,
    private readonly userService: UserService,
  ) {}

  async newPost(
    postInfo: CreatePostDto,
    user: FunUser,
    topicExist: Topic | null,
    pics?,
  ) {
    const newPost = new Post();
    if (topicExist) newPost.topic = topicExist;
    newPost.content = postInfo.content;
    newPost.state = postInfo.state;
    newPost.author = user;
    const post = await this.postRepo.save(newPost);
    const query = this.postRepo
      .createQueryBuilder('post')
      .where('post.id=:id', { id: post.id });
    if (topicExist) query.leftJoinAndSelect('post.topic', 'topic');
    if (pics.length > 0) {
      for (const pic of pics) {
        const newPic = new Picture();
        newPic.author = user;
        newPic.post = post;
        newPic.path = `${pic.destination}/${pic.filename}`;
        newPic.originalname = pic.originalname;
        newPic.filename = pic.filename;
        newPic.size = pic.size;
        await this.pictureRepo.save(newPic);
      }
      const result = await query
        .leftJoinAndSelect('post.pictures', 'picture')
        .select([
          'post.content',
          'post.state',
          'post.createDate',
          'picture.path',
        ])
        .getOne();
      return result;
    } else {
      return await query
        .select(['post.content', 'post.state', 'post.createDate'])
        .getOne();
    }
  }

  async create(postInfo: CreatePostDto, user: FunUser, pics?) {
    if (postInfo.topic) {
      const topic = await this.topicRepo.findOne({
        where: { id: postInfo.topic },
      });
      if (!topic) throw new NotFoundException('找不到该话题');
      const userState = await this.userTopicStateRepo.findOne({
        where: { user: { id: user.id }, topic: { id: postInfo.topic } },
      });
      if (!userState) {
        if (postInfo.state === 'public') {
          const newState = new UserTopicState();
          newState.user = user;
          newState.topic = topic;
          await this.userTopicStateRepo.save(newState);
          topic.participants.push(user);
          await this.topicRepo.save(topic);
        }
      }
      if (userState.state === 0) throw new ForbiddenException();
      const result = await this.newPost(postInfo, user, topic, pics);
      return { ...result, like_count: 0, comment_count: 0 };
    } else {
      const result = await this.newPost(postInfo, user, null, pics);
      return { ...result, like_count: 0, comment_count: 0 };
    }
  }

  async update(postInfo: UpdatePostDto, user: FunUser, pics?) {
    const post = await this.postRepo.findOne({
      where: {
        id: postInfo.id,
        author: { id: user.id },
      },
    });
    if (post && post.state === 'draft') {
      return await this.create(postInfo, user, pics);
    } else {
      throw new ForbiddenException();
    }
  }
  async findOneByUser(validateIds: validateIds) {
    const { userId, validateId } = validateIds;
    const post = await this.postRepo.findOne({
      where: { author: { id: userId }, id: validateId },
    });
    if (post) {
      const comment_count = await this.commentRepo.count({
        where: { post: { id: validateId } },
      });
      const like_count = await this.likeRepo.count({
        where: { post: { id: validateId } },
      });
      return { ...post, comment_count, like_count };
    } else {
      throw new ForbiddenException();
    }
  }

  async findOneById(id: number) {
    const query = this.postRepo
      .createQueryBuilder('post')
      .where('post.id=:id', { id });
    if (query.getOne()) {
      const post = await query
        .leftJoinAndSelect('post.author', 'user')
        .leftJoinAndSelect('post.pictures', 'picture')
        .leftJoinAndSelect('post.topic', 'topic')
        .leftJoinAndSelect('post.likes', 'like')
        .leftJoinAndSelect('like.author', 'like_author')
        .leftJoinAndSelect('post.comments', 'comment')
        .leftJoinAndSelect('comment.author', 'comment_author')
        .loadRelationCountAndMap('post.comment_count', 'post.comments')
        .loadRelationCountAndMap('post.like_count', 'post.likes')
        .orderBy('comment.updateDate', 'DESC')
        .getOne();
      return post;
    } else {
      throw new NotFoundException('找不到该动态');
    }
  }

  async findAllByUser(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (user) {
      return await this.postRepo
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.author', 'user', 'user.id=:id', {
          id: userId,
        })
        .leftJoinAndSelect('post.pictures', 'picture')
        .leftJoinAndSelect('post.topic', 'topic')
        .leftJoinAndSelect('post.likes', 'like')
        .leftJoinAndSelect('like.author', 'like_author')
        .leftJoin('post.comments', 'comment')
        .loadRelationCountAndMap('post.comment_count', 'post.comments')
        .loadRelationCountAndMap('post.like_count', 'post.likes')
        .orderBy('post.updateDate', 'DESC')
        .getMany();
    }
  }

  async findAll() {
    return await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user')
      .leftJoinAndSelect('post.pictures', 'picture')
      .leftJoinAndSelect('post.topic', 'topic')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.author', 'like_author')
      .leftJoin('post.comments', 'comment')
      .loadRelationCountAndMap('post.comment_count', 'post.comments')
      .loadRelationCountAndMap('post.like_count', 'post.likes')
      .orderBy('post.updateDate', 'DESC')
      .getMany();
  }

  async remove(validateIds: validateIds) {
    const post = await this.findOneByUser(validateIds);
    await this.postRepo.remove(post);
    return true;
  }
}
