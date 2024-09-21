import { Injectable } from '@nestjs/common';

import { CreateMemberDto, UpdateMemberDto } from '@modules/members/domain/dtos';
import { MembersService } from '@modules/members/services/members.service';
import { IMembersApplication } from '../interfaces';
import { BorrowRelation } from '@common/interfaces';
import { FindBorrowDto } from '@modules/borrows/domain/dtos';

@Injectable()
export class MembersApplication implements IMembersApplication {
  constructor(private readonly memberService: MembersService) {}

  async getAllMember() {
    return this.memberService.getAllMember();
  }

  async getMember(memberCode: string) {
    return this.memberService.getMember(memberCode);
  }

  async createMember(dto: CreateMemberDto) {
    return this.memberService.createMember(dto);
  }

  async updateMember(memberCode: string, dto: UpdateMemberDto) {
    return this.memberService.updateMember(memberCode, dto);
  }

  async deleteMember(memberCode: string) {
    return this.memberService.deleteMember(memberCode);
  }

  // borrow logic
  async borrowBook(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    return this.memberService.borrowBook(dto);
  }

  async returnBook(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    return this.memberService.returnBook(dto);
  }
}
