import { PartialType } from '@nestjs/swagger';
import { CreateDocumentoReferenciaDto } from './create-documento-referencia.dto';

export class UpdateDocumentoReferenciaDto extends PartialType(CreateDocumentoReferenciaDto) {}
