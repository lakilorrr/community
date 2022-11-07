import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: '评论内容' })
  @IsNotEmpty({ message: '评论不能为空' })
  content: string;

  @ApiProperty({ description: '动态ID' })
  @IsNumber()
  @IsNotEmpty({ message: '动态不能为空' })
  postId: number;

  @ApiPropertyOptional({ description: '评论ID' })
  @IsOptional()
  @IsNumber()
  replyId?: number;
}
