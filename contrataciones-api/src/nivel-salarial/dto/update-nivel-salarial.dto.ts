import { PartialType } from '@nestjs/swagger';
import { CreateNivelSalarialDto } from './create-nivel-salarial.dto';

export class UpdateNivelSalarialDto extends PartialType(CreateNivelSalarialDto) {}
