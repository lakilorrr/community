import {
  Body,
  Controller,
  Get,
  Param, Post, Put, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { storageConfig } from 'src/config/uploadStorage.config';
import { Role } from 'src/core/decorator/role.decorator';
import { User } from 'src/core/decorator/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ description: '用户注册参数', type: CreateUserDto })
  @UseInterceptors(FileInterceptor('avatar', storageConfig))
  @Post('register')
  register(@Body() user: CreateUserDto, @UploadedFile() pic?) {
    return this.userService.register(user, pic);
  }

  @ApiOperation({ summary: '通过id查找用户' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @ApiOperation({ summary: '更新用户角色' })
  @ApiBody({ description: '用户角色更新参数', type: UpdateRoleDto })
  @ApiBearerAuth()
  @Role('root')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.userService.updateRole(+id, updateRoleDto);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiBody({ description: '用户信息更新参数', type: UpdateUserDto })
  @ApiBearerAuth()
  @Role('user')
  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  @UseInterceptors(FileInterceptor('avatar', storageConfig))
  update(
    @User('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() pic?,
  ) {
    return this.userService.update(userId, updateUserDto, pic);
  }
}
