import { PartialType } from '@nestjs/swagger';
import { CreateRequerimientoplanDto } from './create-requerimientoplan.dto';

export class UpdateRequerimientoplanDto extends PartialType(CreateRequerimientoplanDto) {}
