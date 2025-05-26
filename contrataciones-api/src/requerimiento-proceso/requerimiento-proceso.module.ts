import { Module } from '@nestjs/common';
import { RequerimientoProcesoService } from './requerimiento-proceso.service';
import { RequerimientoProcesoController } from './requerimiento-proceso.controller';
import { RequerimientoProceso } from './entities/requerimiento-proceso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      TypeOrmModule.forFeature([RequerimientoProceso]),
      JwtModule.register({})
  ],
  controllers: [RequerimientoProcesoController],
  providers: [RequerimientoProcesoService],
  exports: [RequerimientoProcesoService], // 🔁 Exporta el servicio para que otros módulos lo usen
})
export class RequerimientoProcesoModule {}
