import { PartialType } from '@nestjs/mapped-types';
import { CreateFormaAdjudicacionDto } from './create-forma-adjudicacion.dto';

export class UpdateFormaAdjudicacionDto extends PartialType(CreateFormaAdjudicacionDto) {}
