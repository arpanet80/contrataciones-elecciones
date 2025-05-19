import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosPacDto } from './create-datos-pac.dto';

export class UpdateDatosPacDto extends PartialType(CreateDatosPacDto) {}
