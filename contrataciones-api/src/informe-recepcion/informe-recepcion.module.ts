import { Module } from '@nestjs/common';
import { InformeRecepcionService } from './informe-recepcion.service';
import { InformeRecepcionController } from './informe-recepcion.controller';
import { InformeRecepcion } from './entities/informe-recepcion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([InformeRecepcion]),
      JwtModule.register({}),
  ],
  controllers: [InformeRecepcionController],
  providers: [InformeRecepcionService],
  exports: [InformeRecepcionService],
})
export class InformeRecepcionModule {}
