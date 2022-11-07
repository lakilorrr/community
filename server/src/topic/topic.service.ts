import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FunUser } from 'src/user/entities/user.entity';
import { UserTopicState } from 'src/user/entities/userTopicState.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { BlockUserDto } from './dto/block-user.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,
    @InjectRepository(UserTopicState)
    private readonly userTopicState: Repository<UserTopicState>,
    private readonly userService: UserService,
  ) {}

  async create(createTopicDto: CreateTopicDto, user: FunUser) {
    const topicExist = await this.topicRepo.findOne({
      where: { name: createTopicDto.name },
    });
    if (topicExist) {
      throw new BadRequestException('话题已存在');
    } else {
      topicExist.host = user;
      return await this.topicRepo.save(createTopicDto);
    }
  }

  async findAllTop3() {
    return await this.topicRepo
      .createQueryBuilder('topic')
      .orderBy('topic.createDate', 'DESC')
      .take(3)
      .getMany();
  }

  async findOne(id: number) {
    const topicExist = await this.topicRepo.findOne({
      where: { id },
    });
    if (topicExist) {
      return await this.topicRepo
        .createQueryBuilder('topic')
        .where('topic.id:=id', { id: id })
        .leftJoinAndSelect('topic.posts', 'post')
        .leftJoinAndSelect('post.pictures', 'picture')
        .leftJoinAndSelect('post.author', 'user')
        .orderBy('post.updateDate', 'DESC')
        .getMany();
    } else {
      throw new NotFoundException('找不到该话题');
    }
  }

  async updateTopic(updateTopicDto: UpdateTopicDto, userId: number) {
    const topicExist = await this.topicRepo.findOne({
      where: { id: updateTopicDto.id },
    });
    if (topicExist) {
      if (topicExist.host.id !== userId) throw new ForbiddenException();
      topicExist.name = updateTopicDto.name;
      return await this.topicRepo.save(topicExist);
    } else {
      throw new NotFoundException('找不到该话题');
    }
  }

  async updateUserState(
    topicId: number,
    blockUserDto: BlockUserDto,
    userId: number,
  ) {
    const topicExist = await this.topicRepo.findOne({
      where: { id: topicId },
    });
    if (!topicExist) throw new NotFoundException('找不到该话题');
    const user = await this.userService.findOneById(blockUserDto.userId);
    if (user) {
      const state = await this.userTopicState.findOne({
        where: { topic: { id: topicId }, user: { id: blockUserDto.userId } },
      });
      if (state) {
        state.state = blockUserDto.state;
        return await this.userTopicState.save(state);
      } else {
        throw new NotFoundException('用户不在该话题中');
      }
    }
  }

  async remove(id: number) {
    const topicExist = await this.topicRepo.findOne({
      where: { id },
    });
    if (topicExist) {
      await this.topicRepo.remove(topicExist);
      return true;
    } else {
      throw new NotFoundException('找不到该话题');
    }
  }
}
