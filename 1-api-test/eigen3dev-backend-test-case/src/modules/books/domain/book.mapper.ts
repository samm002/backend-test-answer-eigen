import { BookBorrow, BorrowRelation } from '@common/interfaces';
import { GetBookDto } from '@modules/books/domain/dtos';
import { mapBorrowRelationTypesToDtos } from '@modules/borrows/domain/borrow.mapper.util';

export function mapBookRelationTypesToDtos(
  book: BookBorrow,
  borrow: BorrowRelation[],
): GetBookDto {
  return {
    code: book.code,
    title: book.title,
    author: book.author,
    stock: book.stock,
    totalBorrowed: book.borrows.length,
    borrows: mapBorrowRelationTypesToDtos(borrow),
  };
}
