import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BooksApplication } from '@modules/books/applications/books.application';
import { CreateBookDto, UpdateBookDto } from '@modules/books/domain/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private bookApplication: BooksApplication) {}

  @Get()
  async getAllBook() {
    return this.bookApplication.getAllBook();
  }

  @Get(':bookCode')
  async getBookByCode(@Param('bookCode') bookCode: string) {
    return this.bookApplication.getBook(bookCode);
  }

  @Post()
  async createBook(@Body() dto: CreateBookDto) {
    return this.bookApplication.createBook(dto);
  }

  @Patch(':bookCode')
  async updateBookByCode(
    @Param('bookCode') bookCode: string,
    @Body() dto: UpdateBookDto,
  ) {
    return this.bookApplication.updateBook(bookCode, dto);
  }

  @Delete(':bookCode')
  async deleteBookByCode(@Param('bookCode') bookCode: string) {
    return this.bookApplication.deleteBook(bookCode);
  }
}
