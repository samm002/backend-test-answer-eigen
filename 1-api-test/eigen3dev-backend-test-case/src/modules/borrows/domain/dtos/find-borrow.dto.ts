import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindBorrowDto {
  @ApiProperty({
    example: 'M001',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  memberCode: string;

  @ApiProperty({
    example: 'JK-45',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  bookCode: string;
}
