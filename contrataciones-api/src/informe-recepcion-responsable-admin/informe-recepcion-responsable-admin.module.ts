import { Module } from '@nestjs/common';
import { InformeRecepcionResponsableAdminService } from './informe-recepcion-responsable-admin.service';
import { InformeRecepcionResponsableAdminController } from './informe-recepcion-responsable-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { InformeRecepcionResponsableAdmin } from './entities/informe-recepcion-responsable-admin.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([InformeRecepcionResponsableAdmin]),
      JwtModule.register({}),
  ],
  controllers: [InformeRecepcionResponsableAdminController],
  providers: [InformeRecepcionResponsableAdminService],
  exports: [InformeRecepcionResponsableAdminService],
})
export class InformeRecepcionResponsableAdminModule {}
