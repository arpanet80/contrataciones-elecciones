import { Module } from '@nestjs/common';
import { MetodoSeleccionAdjudicService } from './metodo-seleccion-adjudic.service';
import { MetodoSeleccionAdjudicController } from './metodo-seleccion-adjudic.controller';
import { MetodoSeleccionAdjudic } from './entities/metodo-seleccion-adjudic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([MetodoSeleccionAdjudic]),
      JwtModule.register({})
  ],
  controllers: [MetodoSeleccionAdjudicController],
  providers: [MetodoSeleccionAdjudicService],
})
export class MetodoSeleccionAdjudicModule {}
