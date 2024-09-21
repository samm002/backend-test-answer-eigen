import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetBookDto } from './get-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBookDto {
  @ApiProperty({
    example: 'Get all books (total book not include borrowed book)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  totalBook: number;

  @IsOptional()
  books: GetBookDto[] | null;
}
