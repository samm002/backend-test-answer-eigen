import { PartialType } from '@nestjs/mapped-types';

import { CreateBookDto } from '@modules/books/domain/dtos';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
