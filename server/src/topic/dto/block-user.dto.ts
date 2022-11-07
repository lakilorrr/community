import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BlockUserDto {
  @ApiProperty({ description: '用户ID' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: '用户状态' })
  @IsNumber()
  @IsNotEmpty()
  state: number;
}
