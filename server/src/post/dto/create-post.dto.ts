import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '动态内容' })
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @ApiProperty({ description: '动态状态' })
  @IsNotEmpty({ message: '状态不能为空' })
  @IsEnum(['draft', 'public'], { message: '只能是draft或public' })
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ description: '话题ID' })
  @IsOptional()
  @IsNumber()
  topic?: number;
}
