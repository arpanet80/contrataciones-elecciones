import { PartialType } from '@nestjs/mapped-types';
import { CreateMetodoSeleccionAdjudicDto } from './create-metodo-seleccion-adjudic.dto';

export class UpdateMetodoSeleccionAdjudicDto extends PartialType(CreateMetodoSeleccionAdjudicDto) {}
