import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { User } from 'src/core/decorator/user.decorator';
import { FunUser } from 'src/user/entities/user.entity';
import { LikeDto } from './dto/like.dto';
import { LikeService } from './like.service';
@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: '创建点赞' })
  @ApiBody({ description: '创建点赞参数', type: LikeDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() LikeDto: LikeDto, @User() user: FunUser) {
    return this.likeService.createOrRemove(LikeDto, user);
  }

  @ApiOperation({ summary: '根据用户ID查找点赞' })
  @ApiQuery({ name: '用户ID' })
  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.likeService.findAllByUser(+userId);
  }
}
