import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MembersApplication } from '@modules/members/applications/members.application.service';
import { FindBorrowDto } from '@modules/borrows/domain/dtos';
import { CreateMemberDto, UpdateMemberDto } from '../domain/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('members')
export class MembersController {
  constructor(private readonly memberApplication: MembersApplication) {}

  @Get()
  async getAllMember() {
    return this.memberApplication.getAllMember();
  }

  @Post(':memberCode/borrow/:bookCode')
  async borrowBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const dto: FindBorrowDto = {
      memberCode,
      bookCode,
    };

    return this.memberApplication.borrowBook(dto);
  }

  @Post(':memberCode/return/:bookCode')
  async returnBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const dto: FindBorrowDto = {
      memberCode,
      bookCode,
    };

    return this.memberApplication.returnBook(dto);
  }

  @Get(':memberCode')
  async getBookByCode(@Param('memberCode') memberCode: string) {
    return this.memberApplication.getMember(memberCode);
  }

  @Post()
  async createMember(@Body() dto: CreateMemberDto) {
    return this.memberApplication.createMember(dto);
  }

  @Patch(':memberCode')
  async updateMemberByCode(
    @Param('memberCode') memberCode: string,
    @Body() dto: UpdateMemberDto,
  ) {
    return this.memberApplication.updateMember(memberCode, dto);
  }

  @Delete(':memberCode')
  async deleteMemberByCode(@Param('memberCode') memberCode: string) {
    return this.memberApplication.deleteMember(memberCode);
  }
}
