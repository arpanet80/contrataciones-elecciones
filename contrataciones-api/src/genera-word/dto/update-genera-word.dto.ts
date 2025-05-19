import { PartialType } from '@nestjs/swagger';
import { CreateGeneraWordDto } from './create-genera-word.dto';

export class UpdateGeneraWordDto extends PartialType(CreateGeneraWordDto) {}
