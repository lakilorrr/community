import {
  Body, Controller, Delete, Get,
  Post, Put, Query, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParamIds, validateIds } from 'src/core/decorator/paramIds.decorator';
import { User } from 'src/core/decorator/user.decorator';
import { FunUser } from 'src/user/entities/user.entity';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
@ApiTags('bookmark')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiOperation({ summary: '创建收藏夹' })
  @ApiBody({ description: '创建收藏夹参数', type: CreateBookmarkDto })
  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto, @User() user: FunUser) {
    return this.bookmarkService.create(user, createBookmarkDto);
  }

  @ApiOperation({ summary: '根据用户ID查找所有收藏夹' })
  @ApiQuery({ name: '用户ID' })
  @Get()
  findAllByUser(@Query('user') userQuery: string, @User('id') userId: number) {
    if (userId === +userQuery) {
      return this.bookmarkService.findAllByUser(+userQuery, true);
    } else {
      return this.bookmarkService.findAllByUser(+userQuery, false);
    }
  }

  @ApiOperation({ summary: '根据收藏夹ID查找收藏夹' })
  @ApiParam({ name: '收藏夹ID' })
  @Get(':id')
  findOneByUser(@ParamIds('id') validateIds: validateIds) {
    return this.bookmarkService.findOneByUser(
      validateIds.userId,
      validateIds.validateId,
    );
  }

  @ApiOperation({ summary: '更新收藏夹' })
  @ApiParam({ name: '收藏夹ID' })
  @ApiBody({ description: '更新收藏夹参数', type: UpdateBookmarkDto })
  @Put(':id')
  update(
    @ParamIds('id') validateIds: validateIds,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(
      validateIds.userId,
      updateBookmarkDto,
      validateIds.validateId,
    );
  }

  @ApiOperation({ summary: '删除收藏夹' })
  @ApiParam({ name: '收藏夹ID' })
  @Delete(':id')
  remove(@ParamIds('id') validateIds: validateIds) {
    return this.bookmarkService.remove(
      validateIds.userId,
      validateIds.validateId,
    );
  }
}
