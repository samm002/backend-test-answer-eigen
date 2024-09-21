import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@config/prisma/prisma.module';
import { BooksModule } from '@modules/books/books.module';
import { BorrowModule } from '@modules/borrows/borrows.module';
import { MembersModule } from '@modules/members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    BooksModule,
    BorrowModule,
    MembersModule,
  ],
})
export class AppModule {}
