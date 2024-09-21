import { BorrowRelation, MemberBorrow } from '@common/interfaces';
import { GetMemberDto } from '@modules/members/domain/dtos';
import { mapBorrowRelationTypesToDtos } from '@modules/borrows/domain/borrow.mapper.util';

export function mapMemberRelationTypesToDtos(
  member: MemberBorrow,
  borrow: BorrowRelation[],
): GetMemberDto {
  return {
    code: member.code,
    name: member.name,
    isPenalized: member.isPenalized,
    booksBorrowed: member.borrows.length,
    borrows: mapBorrowRelationTypesToDtos(borrow),
  };
}
