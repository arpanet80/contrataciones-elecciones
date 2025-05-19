import { Module } from '@nestjs/common';
import { RequerimientoPlanSolprocesoService } from './requerimiento-plan-solproceso.service';
import { RequerimientoPlanSolprocesoController } from './requerimiento-plan-solproceso.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequerimientoPlanSolproceso } from './entities/requerimiento-plan-solproceso.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([RequerimientoPlanSolproceso]),
      JwtModule.register({})
  ],
  controllers: [RequerimientoPlanSolprocesoController],
  providers: [RequerimientoPlanSolprocesoService],
})
export class RequerimientoPlanSolprocesoModule {}
