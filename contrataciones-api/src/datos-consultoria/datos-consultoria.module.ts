import { Module } from '@nestjs/common';
import { DatosConsultoriaService } from './datos-consultoria.service';
import { DatosConsultoriaController } from './datos-consultoria.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosConsultoria } from './entities/datos-consultoria.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([DatosConsultoria]),
      JwtModule.register({})
  ],
  controllers: [DatosConsultoriaController],
  providers: [DatosConsultoriaService],
})
export class DatosConsultoriaModule {}
