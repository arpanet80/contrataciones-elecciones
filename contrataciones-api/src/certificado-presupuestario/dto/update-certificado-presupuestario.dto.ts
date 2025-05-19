import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificadoPresupuestarioDto } from './create-certificado-presupuestario.dto';

export class UpdateCertificadoPresupuestarioDto extends PartialType(CreateCertificadoPresupuestarioDto) {}
