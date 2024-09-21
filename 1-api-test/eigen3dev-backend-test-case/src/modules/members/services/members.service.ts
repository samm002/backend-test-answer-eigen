import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '@config/prisma/prisma.service';
import {
  CreateMemberDto,
  GetMemberDto,
  UpdateMemberDto,
} from '@modules/members/domain/dtos';
import { mapMemberRelationTypesToDtos } from '@modules/members/domain/member.mapper';
import { IMembersService } from '@modules/members/interfaces';
import { BorrowsService } from '@modules/borrows/services/borrows.service';
import { FindBorrowDto } from '@modules/borrows/domain/dtos';
import { BorrowRelation } from '@common/interfaces';

@Injectable()
export class MembersService implements IMembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly borrowService: BorrowsService,
  ) {}

  async getAllMember(): Promise<GetMemberDto[]> {
    const membersWithBorrow = [];
    const members = await this.prisma.member.findMany({
      include: {
        borrows: {
          where: {
            returnedTime: null,
          },
        },
      },
    });

    for (const member of members) {
      const borrowData = [];
      for (const borrow of member.borrows) {
        const dto = {
          memberCode: borrow.memberCode,
          bookCode: borrow.bookCode,
        };
        const borrowInfo = await this.borrowService.get(dto);
        borrowData.push(borrowInfo);
      }
      membersWithBorrow.push(mapMemberRelationTypesToDtos(member, borrowData));
    }

    return membersWithBorrow;
  }

  async getMember(memberCode: string): Promise<Member> {
    return await this.prisma.member.findFirst({
      where: {
        code: memberCode,
      },
    });
  }

  async createMember(dto: CreateMemberDto): Promise<Member> {
    try {
      const returnDeadline = new Date();
      returnDeadline.setDate(returnDeadline.getDate() + 3);

      return await this.prisma.member.create({
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
          `Member with ${error.meta?.target} ${dto.code} already exists`,
        );
      }
      throw error;
    }
  }

  async updateMember(
    memberCode: string,
    dto: UpdateMemberDto,
  ): Promise<Member> {
    try {
      const member = await this.getMember(memberCode);

      if (!member) {
        throw new NotFoundException('member not found');
      }

      return await this.prisma.member.update({
        where: {
          id: member.id,
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
          `Member with ${error.meta?.target} ${dto.code} already exists`,
        );
      }
      throw error;
    }
  }

  async deleteMember(memberCode: string): Promise<Member> {
    const member = await this.getMember(memberCode);

    if (!member) {
      throw new NotFoundException('member not found');
    }

    return await this.prisma.member.delete({
      where: {
        id: member.id,
      },
    });
  }

  // Borrow Logic
  async borrowBook(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    return this.borrowService.create(dto);
  }

  async returnBook(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    return this.borrowService.update(dto);
  }
}
