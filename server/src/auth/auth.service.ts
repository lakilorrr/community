import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FunUser } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { getTimeStamp } from 'src/utils/getTimeStamp';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async validateUser(id: number) {
    return await this.userService.findOneById(id);
  }

  async getToken(payload: Record<string | number, any>) {
    const nowTime = new Date().getTime();
    const access = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_TOKEN_KEY', 'secretKey'),
      expiresIn: this.configService.get('ACCESS_EXPIRE_IN', '4h'),
    });
    const accessExpiresIn =
      nowTime + this.configService.get('ACCESS_EXPIRE_IN', '4h');
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRSH_TOKEN_KEY', 'secretRefreshKey'),
      expiresIn: this.configService.get('REFRESH_EXPIRE_IN', '7d'),
    });
    const refreshExpiresIn =
      nowTime + getTimeStamp(this.configService.get('REFRESH_EXPIRE_IN', '7d'));
    return { access, accessExpiresIn, refresh, refreshExpiresIn };
  }

  async login(userLogin: CreateUserDto) {
    const { name, password } = userLogin;
    const user = await this.userService.findOneByName(name);
    const compareSalt = await this.userService.findSalt(user.id);
    const isPasswordCorrect = compareSync(password, compareSalt.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('密码错误');
    }
    const payload: Partial<FunUser> = {
      name: user.name,
      id: user.id,
      role: user.role,
      avatar: user.avatar,
    };
    const token = await this.getToken(payload);
    return { ...token, ...payload };
  }

  async refresh(user: FunUser) {
    const payload: Partial<FunUser> = {
      name: user.name,
      id: user.id,
      role: user.role,
      avatar: user.avatar,
    };
    const token = await this.getToken(payload);
    return { ...token, ...payload };
  }
}
