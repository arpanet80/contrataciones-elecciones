import { PartialType } from '@nestjs/mapped-types';
import { CreateRequerimientoProcesoDto } from './create-requerimiento-proceso.dto';

export class UpdateRequerimientoProcesoDto extends PartialType(CreateRequerimientoProcesoDto) {}
