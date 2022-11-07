import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '角色不能为空' })
  @IsEnum(['operator', 'user'], { message: '只能是operator或user' })
  role: string;
}
