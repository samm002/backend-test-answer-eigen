import { Borrow, Member } from '@prisma/client';

export interface MemberBorrow extends Member {
  borrows: Borrow[];
}
