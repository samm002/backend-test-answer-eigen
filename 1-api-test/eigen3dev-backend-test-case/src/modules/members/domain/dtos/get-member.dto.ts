import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ResponseBorrowDto } from '@modules/borrows/domain/dtos';

export class GetMemberDto {
  @ApiProperty({
    example: 'M001',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Angga',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: false,
    required: true,
  })
  @IsOptional()
  @IsBoolean()
  isPenalized?: boolean;

  @ApiProperty({
    example: '2024-09-28T16:49:13.926Z',
    required: true,
  })
  @IsDateString()
  @IsOptional()
  penaltyDuration?: Date;

  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  booksBorrowed: number;

  @IsOptional()
  borrows: ResponseBorrowDto[];
}
