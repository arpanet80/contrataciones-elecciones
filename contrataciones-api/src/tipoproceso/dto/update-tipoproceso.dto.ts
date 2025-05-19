import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoprocesoDto } from './create-tipoproceso.dto';

export class UpdateTipoprocesoDto extends PartialType(CreateTipoprocesoDto) {}
