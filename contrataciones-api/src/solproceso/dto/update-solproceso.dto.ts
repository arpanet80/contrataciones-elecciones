import { PartialType } from '@nestjs/mapped-types';
import { CreateSolprocesoDto } from './create-solproceso.dto';

export class UpdateSolprocesoDto extends PartialType(CreateSolprocesoDto) {}
