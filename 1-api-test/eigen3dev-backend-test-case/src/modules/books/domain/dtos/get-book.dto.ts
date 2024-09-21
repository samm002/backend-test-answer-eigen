import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ResponseBorrowDto } from '@modules/borrows/domain/dtos';

export class GetBookDto {
  @ApiProperty({
    example: 'JK-45',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Harry Potter',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'J.K Rowling',
    required: true,
  })
  @IsOptional()
  @IsBoolean()
  author?: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  totalBorrowed: number;

  @IsOptional()
  borrows: ResponseBorrowDto[];
}
