import { PartialType } from '@nestjs/mapped-types';
import { CreateFormaContratacionDto } from './create-forma-contratacion.dto';

export class UpdateFormaContratacionDto extends PartialType(CreateFormaContratacionDto) {}
