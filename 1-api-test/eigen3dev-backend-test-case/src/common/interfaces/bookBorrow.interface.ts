import { Borrow, Book } from '@prisma/client';

export interface BookBorrow extends Book {
  borrows: Borrow[];
}
