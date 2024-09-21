import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';

import {
  CreateBookDto,
  ResponseBookDto,
  UpdateBookDto,
} from '@modules/books/domain/dtos';
import { IBooksApplication } from '@modules/books/interfaces';
import { BooksService } from '@modules/books/services/books.service';
import { BookBorrow } from '@common/interfaces';

@Injectable()
export class BooksApplication implements IBooksApplication {
  constructor(private readonly bookService: BooksService) {}

  async getAllBook(): Promise<ResponseBookDto> {
    return this.bookService.getAllBook();
  }

  async getBook(bookCode: string): Promise<BookBorrow | null> {
    return this.bookService.getBook(bookCode);
  }

  async createBook(dto: CreateBookDto): Promise<Book | null> {
    return this.bookService.createBook(dto);
  }

  async updateBook(bookCode: string, dto: UpdateBookDto): Promise<Book | null> {
    return this.bookService.updateBook(bookCode, dto);
  }

  async deleteBook(bookCode: string): Promise<Book | null> {
    return this.bookService.deleteBook(bookCode);
  }
}
