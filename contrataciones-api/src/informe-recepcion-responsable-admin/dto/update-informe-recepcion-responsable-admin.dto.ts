import { PartialType } from '@nestjs/swagger';
import { CreateInformeRecepcionResponsableAdminDto } from './create-informe-recepcion-responsable-admin.dto';

export class UpdateInformeRecepcionResponsableAdminDto extends PartialType(CreateInformeRecepcionResponsableAdminDto) {}
