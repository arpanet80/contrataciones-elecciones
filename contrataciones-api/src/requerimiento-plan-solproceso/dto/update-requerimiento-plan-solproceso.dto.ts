import { PartialType } from '@nestjs/mapped-types';
import { CreateRequerimientoPlanSolprocesoDto } from './create-requerimiento-plan-solproceso.dto';

export class UpdateRequerimientoPlanSolprocesoDto extends PartialType(CreateRequerimientoPlanSolprocesoDto) {}
