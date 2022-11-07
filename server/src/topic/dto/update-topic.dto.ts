import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @ApiProperty({ description: '话题ID' })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
