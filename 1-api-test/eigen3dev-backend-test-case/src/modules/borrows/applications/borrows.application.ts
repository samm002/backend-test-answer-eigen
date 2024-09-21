import { Injectable } from '@nestjs/common';

import { FindBorrowDto } from '@modules/borrows/domain/dtos';
import { IBorrowsApplication } from '@modules/borrows/interfaces';
import { BorrowsService } from '@modules/borrows/services/borrows.service';

@Injectable()
export class BorrowsApplication implements IBorrowsApplication {
  constructor(private readonly borrowService: BorrowsService) {}

  async getAllBorrow(dto: FindBorrowDto) {
    return this.borrowService.get(dto);
  }
}
