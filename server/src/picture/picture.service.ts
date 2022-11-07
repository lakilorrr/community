import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepo: Repository<Picture>,
  ) {}
  async create(pic) {
    const newPic = new Picture();
    newPic.path = `${pic.destination}/${pic.originalname}`;
    newPic.originalname = pic.originalname;
    newPic.size = pic.size;
    return await this.pictureRepo.save(newPic);
  }
}
