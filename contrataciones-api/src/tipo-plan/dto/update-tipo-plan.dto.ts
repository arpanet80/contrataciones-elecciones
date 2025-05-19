import { PartialType } from '@nestjs/swagger';
import { CreateTipoPlanDto } from './create-tipo-plan.dto';

export class UpdateTipoPlanDto extends PartialType(CreateTipoPlanDto) {}
