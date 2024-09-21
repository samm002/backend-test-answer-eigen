import { ResponseBorrowDto } from '@modules/borrows/domain/dtos';
import { BorrowRelation } from '@common/interfaces';

export function mapBorrowRelationTypesToDtos(
  borrows: BorrowRelation[],
): ResponseBorrowDto[] {
  return borrows.map((borrow) => ({
    borrowedTime: borrow.borrowedTime,
    returnDeadline: borrow.returnDeadline,
    returnedTime: borrow.returnedTime,
    memberCode: borrow.memberCode,
    member: borrow.member,
    bookCode: borrow.bookCode,
    book: borrow.book,
  }));
}
