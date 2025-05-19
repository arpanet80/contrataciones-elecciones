import { Module } from '@nestjs/common';
import { SolprocesoService } from './solproceso.service';
import { SolprocesoController } from './solproceso.controller';
import { Solproceso } from './entities/solproceso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Tipoproceso } from 'src/tipoproceso/entities/tipoproceso.entity';
import { FormaAdjudicacion } from 'src/forma-adjudicacion/entities/forma-adjudicacion.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { FormaContratacion } from 'src/forma-contratacion/entities/forma-contratacion.entity';
import { MetodoSeleccionAdjudic } from 'src/metodo-seleccion-adjudic/entities/metodo-seleccion-adjudic.entity';
import { Plan } from 'src/planes/entities/plane.entity';
import { EstadoProceso } from 'src/estado-proceso/entities/estado-proceso.entity';
import { Clasificador } from 'src/clasificador/entities/clasificador.entity';
import { UnidadMedida } from 'src/unidad-medida/entities/unidad-medida.entity';
import { DocumentoReferencia } from 'src/documento-referencia/entities/documento-referencia.entity';
import { NivelSalarial } from 'src/nivel-salarial/entities/nivel-salarial.entity';
import { Rpa } from 'src/rpa/entities/rpa.entity';
import { RequerimientoPlanSolproceso } from 'src/requerimiento-plan-solproceso/entities/requerimiento-plan-solproceso.entity';
import { RequerimientoProceso } from 'src/requerimiento-proceso/entities/requerimiento-proceso.entity';
import { CertificadoPresupuestario } from 'src/certificado-presupuestario/entities/certificado-presupuestario.entity';
import { DatosConsultoria } from 'src/datos-consultoria/entities/datos-consultoria.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Solproceso, Tipoproceso, FormaAdjudicacion, FormaContratacion, Funcionario, 
        MetodoSeleccionAdjudic, Plan, EstadoProceso, Clasificador, UnidadMedida, DocumentoReferencia, 
        NivelSalarial, Rpa, RequerimientoPlanSolproceso, RequerimientoProceso, CertificadoPresupuestario,
        DatosConsultoria
      ]),
      JwtModule.register({}),
      // HttpModule
    ],
  controllers: [SolprocesoController],
  providers: [SolprocesoService],
})
export class SolprocesoModule {}
