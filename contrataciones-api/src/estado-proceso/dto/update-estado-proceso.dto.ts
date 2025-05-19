import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoProcesoDto } from './create-estado-proceso.dto';

export class UpdateEstadoProcesoDto extends PartialType(CreateEstadoProcesoDto) {}
