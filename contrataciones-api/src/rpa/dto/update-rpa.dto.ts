import { PartialType } from '@nestjs/swagger';
import { CreateRpaDto } from './create-rpa.dto';

export class UpdateRpaDto extends PartialType(CreateRpaDto) {}
