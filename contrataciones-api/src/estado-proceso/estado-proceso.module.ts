import { Module } from '@nestjs/common';
import { EstadoProcesoService } from './estado-proceso.service';
import { EstadoProcesoController } from './estado-proceso.controller';
import { EstadoProceso } from './entities/estado-proceso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([EstadoProceso]),
      JwtModule.register({})
  ],
  controllers: [EstadoProcesoController],
  providers: [EstadoProcesoService],
})
export class EstadoProcesoModule {}
