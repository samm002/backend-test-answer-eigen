import { Member } from '@prisma/client';

import {
  CreateMemberDto,
  GetMemberDto,
  UpdateMemberDto,
} from '@modules/members/domain/dtos';
import { BorrowRelation } from '@common/interfaces';
import { FindBorrowDto } from '@modules/borrows/domain/dtos';

export interface IMembersApplication {
  getAllMember(): Promise<GetMemberDto[]>;
  getMember(memberCode: string): Promise<Member | null>;
  createMember(dto: CreateMemberDto): Promise<Member | null>;
  updateMember(
    memberCode: string,
    dto: UpdateMemberDto,
  ): Promise<Member | null>;
  deleteMember(memberCode: string): Promise<Member | null>;

  // borrow logic
  borrowBook(dto: FindBorrowDto): Promise<BorrowRelation | null>;
  returnBook(dto: FindBorrowDto): Promise<BorrowRelation | null>;
}
