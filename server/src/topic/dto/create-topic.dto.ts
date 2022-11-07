import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({ description: '话题名称' })
  @IsNotEmpty({ message: '话题名称不能为空' })
  name: string;
}
