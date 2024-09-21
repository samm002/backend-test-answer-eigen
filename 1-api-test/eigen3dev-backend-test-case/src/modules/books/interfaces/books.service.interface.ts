import { Book } from '@prisma/client';
import {
  CreateBookDto,
  ResponseBookDto,
  UpdateBookDto,
} from '@modules/books/domain/dtos';
import { BookBorrow } from '@common/interfaces';

export interface IBooksService {
  getAllBook(): Promise<ResponseBookDto>;
  getBook(bookCode: string): Promise<BookBorrow | null>;
  createBook(dto: CreateBookDto): Promise<Book | null>;
  updateBook(bookCode: string, dto: UpdateBookDto): Promise<Book | null>;
  deleteBook(bookCode: string): Promise<Book | null>;
  incrementBookCount(bookCode: string): Promise<Book | null>;
  decrementBookCount(bookCode: string): Promise<Book | null>;
}
