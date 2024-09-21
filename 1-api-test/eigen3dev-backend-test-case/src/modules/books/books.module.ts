import { Module } from '@nestjs/common';

import { BooksController } from '@modules/books/controller/books.controller';
import { BooksApplication } from './applications/books.application';
import { BooksService } from './services/books.service';
import { BorrowModule } from '@modules/borrows/borrows.module';

@Module({
  imports: [BorrowModule],
  controllers: [BooksController],
  providers: [BooksApplication, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
