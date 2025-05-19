import { PartialType } from '@nestjs/mapped-types';
import { CreateClasificadorDto } from './create-clasificador.dto';

export class UpdateClasificadorDto extends PartialType(CreateClasificadorDto) {}
