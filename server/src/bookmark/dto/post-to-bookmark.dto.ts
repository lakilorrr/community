import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PostToBookmarkDto {
  @ApiProperty({ description: '动态ID' })
  @IsNumber()
  post: number;

  @ApiPropertyOptional({ description: '收藏夹ID' })
  @IsNumber()
  @IsOptional()
  bookmark?: number;
}
