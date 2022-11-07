import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { Picture } from 'src/picture/entities/picture.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FunUser } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(FunUser)
    private readonly userRepo: Repository<FunUser>,
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
  ) {}

  async register(register: CreateUserDto, pic?) {
    const { name } = register;
    const isUserExist = await this.userRepo.findOne({
      where: { name },
    });
    if (isUserExist) {
      throw new BadRequestException('用户名已存在');
    }
    const newUser = this.userRepo.create(register);
    if (pic) {
      const newPic = new Picture();
      newPic.path = `${pic.destination}/${pic.filename}`;
      newUser.avatar = `${pic.destination}/${pic.filename}`;
      newPic.originalname = pic.originalname;
      newPic.filename = pic.filename;
      newPic.size = pic.size;
      await this.pictureRepo.save(newPic);
    }
    await this.userRepo.save(newUser);
    return true;
  }

  async findOneByName(name: string) {
    const user = await this.userRepo.findOne({
      where: { name },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('找不到该用户');
    }
  }

  async findOneById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('找不到该用户');
    }
  }

  async findSalt(id: number) {
    return this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select('user.password')
      .getOne();
  }

  async updateRole(userId: number, updateRoleDto: UpdateRoleDto) {
    const user = await this.findOneById(userId);
    user.role = updateRoleDto.role;
    return await this.userRepo.save(user);
  }
  async update(userId: number, updateUserDto: UpdateUserDto, pic?) {
    const query = this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId });
    const user = await query.getOne();
    const { name, password } = updateUserDto;
    if (name) {
      const nameExist = await this.userRepo.findOne({ where: { name } });
      if (nameExist) throw new BadRequestException('用户名已存在');
      user.name = name;
    }
    if (password) {
      const userSelectPassword = await query.select('user.password').getOne();
      const compare = compareSync(password, userSelectPassword.password);
      if (compare) throw new BadRequestException('新密码与原密码相等');
      user.password = password;
    }
    if (pic) {
      const newPic = new Picture();
      newPic.author = user;
      newPic.path = `${pic.destination}/${pic.filename}`;
      newPic.originalname = pic.originalname;
      newPic.filename = pic.filename;
      newPic.size = pic.size;
      if (user.avatar) {
        const avatarExist = await this.pictureRepo.findOne({
          where: { path: user.avatar },
        });
        if (avatarExist) await this.pictureRepo.remove(avatarExist);
        await this.pictureRepo.save(newPic);
      }
      user.avatar = newPic.path;
    }
    return await this.userRepo.save(user);
  }

}
