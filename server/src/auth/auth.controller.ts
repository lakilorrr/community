import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/core/decorator/user.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FunUser } from 'src/user/entities/user.entity';
import { Role } from '../core/decorator/role.decorator';
import { AuthService } from './auth.service';
import { RoleGuard } from './role.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ description: '登录参数', type: CreateUserDto })
  @Post('login')
  async login(@Body() userLogin: CreateUserDto) {
    return await this.authService.login(userLogin);
  }

  @ApiOperation({ summary: '获取refresh token' })
  @ApiHeader({ name: 'refresh' })
  @UseGuards(AuthGuard('refresh'))
  @Get('refresh')
  async refresh(@User() user: FunUser) {
    return await this.authService.refresh(user);
  }
}
