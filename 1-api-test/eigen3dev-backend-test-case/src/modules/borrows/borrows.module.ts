import { Module } from '@nestjs/common';

import { BorrowsController } from '@modules/borrows/controller/borrows.controller';
import { BorrowsService } from '@modules/borrows/services/borrows.service';
import { BorrowsApplication } from '@modules/borrows/applications/borrows.application';

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsApplication, BorrowsService],
  exports: [BorrowsService],
})
export class BorrowModule {}
