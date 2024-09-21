import { FindBorrowDto } from '@modules/borrows/domain/dtos';
import { BorrowRelation } from '@common/interfaces';

export interface IBorrowsService {
  get(dto: FindBorrowDto): Promise<BorrowRelation | null>;
  create(dto: FindBorrowDto): Promise<BorrowRelation | null>;
  update(dto: FindBorrowDto): Promise<BorrowRelation | null>;
}
