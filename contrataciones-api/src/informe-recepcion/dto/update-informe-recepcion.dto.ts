import { PartialType } from '@nestjs/swagger';
import { CreateInformeRecepcionDto } from './create-informe-recepcion.dto';

export class UpdateInformeRecepcionDto extends PartialType(CreateInformeRecepcionDto) {}
