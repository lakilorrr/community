import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({ description: '收藏夹名称' })
  @IsNotEmpty({ message: '收藏夹名称不能为空' })
  name: string;

  @ApiPropertyOptional({ description: '收藏夹状态' })
  @IsOptional()
  public?: number;
}
