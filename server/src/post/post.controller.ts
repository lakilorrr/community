import {
  Body, Controller, Delete, Get, Param, Post,
  Put, Query, UploadedFiles,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { storageConfig } from 'src/config/uploadStorage.config';
import { ParamIds, validateIds } from 'src/core/decorator/paramIds.decorator';
import { User } from 'src/core/decorator/user.decorator';
import { FunUser } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '发布动态' })
  @ApiBody({ description: '发布动态参数', type: CreatePostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  @UseInterceptors(FilesInterceptor('picture', 9, storageConfig))
  create(
    @Body() postInfo: CreatePostDto,
    @User() user: FunUser,
    @UploadedFiles() pics?,
  ) {
    return this.postService.create(postInfo, user, pics);
  }

  @ApiOperation({ summary: '更新动态' })
  @ApiBody({ description: '更新动态参数', type: UpdatePostDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  @UseInterceptors(FilesInterceptor('picture', 9, storageConfig))
  update(
    @Body() postInfo: UpdatePostDto,
    @User() user: FunUser,
    @UploadedFiles() pics?,
  ) {
    return this.postService.update(postInfo, user, pics);
  }

  @ApiOperation({ summary: '根据用户ID查找所有动态' })
  @ApiQuery({ name: '用户id' })
  @Get()
  findAllByUser(@Query('user') userQuery: string) {
    return this.postService.findAllByUser(+userQuery);
  }

  @ApiOperation({ summary: '获取所有动态' })
  @Get('all')
  findAll() {
    return this.postService.findAll();
  }
  @ApiOperation({ summary: '通过id查找动态' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.postService.findOneById(id);
  }

  @ApiOperation({ summary: '删除动态' })
  @ApiParam({ name: '动态ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@ParamIds('id') validateIds: validateIds) {
    return this.postService.remove(validateIds);
  }
}
