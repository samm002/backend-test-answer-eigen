import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@config/prisma/prisma.service';
import { FindBorrowDto } from '@modules/borrows/domain/dtos';
import { IBorrowsService } from '@modules/borrows/interfaces/borrows.service.interface';
import { BorrowRelation } from '@common/interfaces';
import { Member } from '@prisma/client';

@Injectable()
export class BorrowsService implements IBorrowsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    return await this.prisma.borrow.findFirst({
      where: {
        ...dto,
      },
      include: {
        book: true,
        member: true,
      },
      orderBy: {
        borrowedTime: 'desc',
      },
    });
  }

  async create(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    const returnDeadline = new Date();
    returnDeadline.setDate(returnDeadline.getDate() + 7);

    return this.prisma.$transaction(async (prisma) => {
      await this.checkBorrowData(dto);

      const borrow = await prisma.borrow.create({
        data: {
          returnDeadline,
          ...dto,
        },
        include: {
          book: true,
          member: true,
        },
      });

      await prisma.book.update({
        where: { code: dto.bookCode },
        data: {
          stock: {
            decrement: 1,
          },
        },
      });

      return borrow;
    });
  }

  async update(dto: FindBorrowDto): Promise<BorrowRelation | null> {
    const eightDaysLater = new Date();
    eightDaysLater.setDate(eightDaysLater.getDate() + 8);

    return this.prisma.$transaction(async (prisma) => {
      const borrow = await this.checkReturnBookData(dto);

      const returnedBorrow = await prisma.borrow.update({
        where: {
          id: borrow.id,
        },
        data: {
          returnedTime: eightDaysLater,
        },
        include: {
          book: true,
          member: true,
        },
      });

      await prisma.book.update({
        where: { code: dto.bookCode },
        data: {
          stock: {
            increment: 1,
          },
        },
      });

      console.log({ returnedBorrow });

      if (returnedBorrow.returnedTime > returnedBorrow.returnDeadline) {
        await this.punishMember(returnedBorrow);
      }

      return returnedBorrow;
    });
  }

  private async checkBorrowData(dto: FindBorrowDto): Promise<void> {
    const currentDateTime = new Date();
    const member = await this.prisma.member.findFirst({
      where: {
        code: dto.memberCode,
      },
      include: {
        borrows: {
          where: {
            returnedTime: null,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.isPenalized) {
      if (currentDateTime < member.penaltyDuration) {
        throw new BadRequestException(
          `Member cannot borrow book due to penalty, penalty duration until : ${member.penaltyDuration}`,
        );
      } else {
        await this.prisma.member.update({
          where: { code: member.code },
          data: {
            isPenalized: false,
            penaltyDuration: null,
          },
        });
      }
    }

    if (member.borrows.length >= 2) {
      throw new BadRequestException('Member cannot borrow more than 2 books');
    }

    const book = await this.prisma.book.findFirst({
      where: {
        code: dto.bookCode,
      },
      include: {
        borrows: true,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.borrows.forEach((borrow) => {
      if (!borrow.returnedTime) {
        throw new BadRequestException('Book is being borrowed');
      }
    });

    if (book.stock <= 0) {
      throw new BadRequestException(
        `Book is not available, stock ready : ${book.stock}`,
      );
    }
  }

  private async checkReturnBookData(
    dto: FindBorrowDto,
  ): Promise<BorrowRelation> {
    const member = await this.prisma.member.findFirst({
      where: {
        code: dto.memberCode,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const book = await this.prisma.book.findFirst({
      where: {
        code: dto.bookCode,
      },
      include: {
        borrows: true,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const borrow = await this.get(dto);

    if (!borrow) {
      throw new NotFoundException(
        'Borrow data not found, member is not borrowing this book',
      );
    }

    if (borrow.returnedTime) {
      throw new BadRequestException(
        `Book is already returned by ${borrow.member.name}`,
      );
    }

    return borrow;
  }

  private async punishMember(borrowData: BorrowRelation): Promise<Member> {
    const penaltyDuration = new Date(borrowData.returnedTime);
    penaltyDuration.setDate(borrowData.returnedTime.getDate() + 3);

    return this.prisma.member.update({
      where: {
        code: borrowData.memberCode,
      },
      data: {
        isPenalized: true,
        penaltyDuration,
      },
    });
  }
}
