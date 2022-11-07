import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LikeDto {
  @ApiProperty({ description: '动态ID' })
  @IsNumber()
  post: number;
}
