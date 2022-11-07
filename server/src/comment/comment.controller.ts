import {
  Body, Controller, Delete, Get, Param, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { ParamIds, validateIds } from 'src/core/decorator/paramIds.decorator';
import { User } from 'src/core/decorator/user.decorator';
import { FunUser } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '创建评论' })
  @ApiBody({ description: '创建评论参数', type: CreateCommentDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  create(@Body() createCommentDto: CreateCommentDto, @User() user: FunUser) {
    return this.commentService.create(createCommentDto, user);
  }

  @ApiOperation({ summary: '根据动态id查找评论' })
  @ApiQuery({ name: '动态ID' })
  @Get('post/:postId')
  findAllByPost(@Param('postId') postId: string) {
    return this.commentService.findAllByPost(+postId);
  }

  @ApiOperation({ summary: '根据用户id查找评论' })
  @ApiQuery({ name: '用户ID' })
  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.commentService.findAllByUser(+userId);
  }

  @ApiOperation({ summary: '删除评论' })
  @ApiParam({ name: '评论ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@ParamIds('id') validateIds: validateIds) {
    return this.commentService.remove(
      validateIds.userId,
      validateIds.validateId,
    );
  }
}
