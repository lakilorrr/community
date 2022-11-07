import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBookmarkDto } from './create-bookmark.dto';

export class UpdateBookmarkDto extends PartialType(CreateBookmarkDto) {
  @ApiProperty({ description: '收藏夹名称' })
  @IsNotEmpty({ message: '收藏夹名称不能为空' })
  name: string;

  @ApiProperty({ description: '收藏夹状态' })
  @IsNotEmpty({ message: '收藏夹状态不能为空' })
  public: number;
}
