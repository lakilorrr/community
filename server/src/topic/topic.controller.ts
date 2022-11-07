import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { Role } from 'src/core/decorator/role.decorator';
import { User } from 'src/core/decorator/user.decorator';
import { FunUser } from 'src/user/entities/user.entity';
import { BlockUserDto } from './dto/block-user.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicService } from './topic.service';
@ApiTags('topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({ summary: '创建话题' })
  @ApiBody({ description: '创建话题参数', type: CreateTopicDto })
  @ApiBearerAuth()
  @Role('operator')
  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  create(@Body() createTopicDto: CreateTopicDto, @User() user: FunUser) {
    return this.topicService.create(createTopicDto, user);
  }

  @ApiOperation({ summary: '更新用户状态' })
  @ApiBody({ description: '更新用户状态参数', type: BlockUserDto })
  @ApiParam({ name: '话题ID' })
  @ApiBearerAuth()
  @Role('operator')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUserState(
    @Param('id') topicId: string,
    @Body() blockUserDto: BlockUserDto,
    @User('id') userId: number,
  ) {
    return this.topicService.updateUserState(+topicId, blockUserDto, userId);
  }

  @ApiOperation({ summary: '获取top3话题' })
  @Get()
  findAllTop3() {
    return this.topicService.findAllTop3();
  }

  @ApiOperation({ summary: '通过ID查找话题' })
  @ApiParam({ name: '话题ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @ApiOperation({ summary: '更新话题' })
  @ApiBody({ description: '更新话题参数', type: UpdateTopicDto })
  @ApiBearerAuth()
  @Role('operator')
  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  updateTopic(
    @Body() updateTopicDto: UpdateTopicDto,
    @User('id') userId: number,
  ) {
    return this.topicService.updateTopic(updateTopicDto, userId);
  }

  @ApiOperation({ summary: '删除话题' })
  @ApiParam({ name: '话题ID' })
  @ApiBearerAuth()
  @Role('operator')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
