import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosConsultoriaDto } from './create-datos-consultoria.dto';

export class UpdateDatosConsultoriaDto extends PartialType(CreateDatosConsultoriaDto) {}
