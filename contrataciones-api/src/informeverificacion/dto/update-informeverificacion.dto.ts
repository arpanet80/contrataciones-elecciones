import { PartialType } from '@nestjs/swagger';
import { CreateInformeverificacionDto } from './create-informeverificacion.dto';

export class UpdateInformeverificacionDto extends PartialType(CreateInformeverificacionDto) {}
