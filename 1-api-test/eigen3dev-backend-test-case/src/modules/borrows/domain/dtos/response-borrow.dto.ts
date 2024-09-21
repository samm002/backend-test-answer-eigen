import { ApiProperty } from '@nestjs/swagger';
import { Book, Member } from '@prisma/client';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseBorrowDto {
  @ApiProperty({
    example: '2024-09-21T15:10:06.891Z',
    required: true,
  })
  @IsNotEmpty()
  borrowedTime: Date;

  @ApiProperty({
    example: '2024-09-28T15:10:06.891Z',
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  returnDeadline: Date;

  @ApiProperty({
    example: '2024-09-22T15:10:06.891Z',
    required: true,
  })
  @IsOptional()
  @IsDate()
  returnedTime: Date;

  @ApiProperty({
    example: 'M001',
    required: true,
  })
  @IsNotEmpty()
  memberCode: string;

  @IsNotEmpty()
  member: Member;

  @ApiProperty({
    example: 'JK-45',
    required: true,
  })
  @IsNotEmpty()
  bookCode: string;

  @IsNotEmpty()
  book: Book;
}
