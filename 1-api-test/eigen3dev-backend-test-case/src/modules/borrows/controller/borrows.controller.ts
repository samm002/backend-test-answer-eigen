import { Controller, Get, Param } from '@nestjs/common';
import { BorrowsApplication } from '../applications/borrows.application';
import { FindBorrowDto } from '../domain/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow')
@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowApplication: BorrowsApplication) {}

  @Get(':memberCode/:bookCode')
  async getAllBorrow(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const dto: FindBorrowDto = {
      memberCode,
      bookCode,
    };

    return this.borrowApplication.getAllBorrow(dto);
  }
}
