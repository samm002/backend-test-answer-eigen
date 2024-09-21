import { Module } from '@nestjs/common';

import { BooksModule } from '@modules/books/books.module';
import { BorrowModule } from '@modules/borrows/borrows.module';
import { BorrowsService } from '@modules/borrows/services/borrows.service';
import { MembersController } from '@modules/members/controller/members.controller';
import { MembersApplication } from './applications/members.application.service';
import { MembersService } from './services/members.service';

@Module({
  imports: [BooksModule, BorrowModule],
  controllers: [MembersController],
  providers: [MembersApplication, MembersService, BorrowsService],
})
export class MembersModule {}
