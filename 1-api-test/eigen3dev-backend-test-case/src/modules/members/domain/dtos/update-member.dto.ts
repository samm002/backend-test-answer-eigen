import { PartialType } from '@nestjs/mapped-types';

import { CreateMemberDto } from '@modules/members/domain/dtos';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
