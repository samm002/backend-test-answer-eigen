import { FindBorrowDto } from '@modules/borrows/domain/dtos';
import { BorrowRelation } from '@common/interfaces';

export interface IBorrowsApplication {
  getAllBorrow(dto: FindBorrowDto): Promise<BorrowRelation | null>;
}
