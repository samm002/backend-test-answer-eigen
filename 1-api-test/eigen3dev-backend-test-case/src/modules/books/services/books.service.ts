import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '@config/prisma/prisma.service';
import {
  CreateBookDto,
  ResponseBookDto,
  UpdateBookDto,
} from '@modules/books/domain/dtos';
import { IBooksService } from '@modules/books/interfaces/books.service.interface';
import { mapBookRelationTypesToDtos } from '@modules/books/domain/book.mapper';
import { BorrowsService } from '@modules/borrows/services/borrows.service';
import { BookBorrow } from '@common/interfaces';

@Injectable()
export class BooksService implements IBooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly borrowService: BorrowsService,
  ) {}

  async getAllBook(): Promise<ResponseBookDto> {
    let totalBook: number = 0;
    const booksWithBorrow = [];
    const books = await this.prisma.book.findMany({
      include: {
        borrows: {
          where: {
            returnedTime: null,
          },
        },
      },
    });

    for (const book of books) {
      if (book.borrows.length < 1) {
        totalBook += book.stock;
      }
      const borrowData = [];
      for (const borrow of book.borrows) {
        const dto = {
          memberCode: borrow.memberCode,
          bookCode: borrow.bookCode,
        };
        const borrowInfo = await this.borrowService.get(dto);
        borrowData.push(borrowInfo);
      }
      booksWithBorrow.push(mapBookRelationTypesToDtos(book, borrowData));
    }

    return {
      message: 'Get all books (total book not include borrowed book)',
      totalBook,
      books: booksWithBorrow,
    };
  }

  async getBook(bookCode: string): Promise<BookBorrow | null> {
    return await this.prisma.book.findFirst({
      where: {
        code: bookCode,
      },
      include: {
        borrows: true,
      },
    });
  }

  async createBook(dto: CreateBookDto): Promise<Book | null> {
    try {
      const returnDeadline = new Date();
      returnDeadline.setDate(returnDeadline.getDate() + 3);

      return await this.prisma.book.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          `Book with ${error.meta?.target} ${dto.code} already exists`,
        );
      }
      throw error;
    }
  }

  async updateBook(bookCode: string, dto: UpdateBookDto): Promise<Book | null> {
    try {
      const book = await this.getBook(bookCode);

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return await this.prisma.book.update({
        where: {
          id: book.id,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          `Book with ${error.meta?.target} ${dto.code} already exists`,
        );
      }
      throw error;
    }
  }

  async deleteBook(bookCode: string): Promise<Book | null> {
    const book = await this.getBook(bookCode);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return await this.prisma.book.delete({
      where: {
        id: book.id,
      },
    });
  }

  async incrementBookCount(bookCode: string): Promise<Book | null> {
    const book = await this.getBook(bookCode);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return await this.prisma.book.update({
      where: {
        id: book.id,
      },
      data: {
        stock: {
          increment: 1,
        },
      },
    });
  }

  async decrementBookCount(bookCode: string): Promise<Book | null> {
    const book = await this.getBook(bookCode);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return await this.prisma.book.update({
      where: {
        id: book.id,
      },
      data: {
        stock: {
          decrement: 1,
        },
      },
    });
  }
}
