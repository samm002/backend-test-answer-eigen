import { Borrow, Book, Member } from '@prisma/client';

export interface BorrowRelation extends Borrow {
  member: Member;
  book: Book;
}
