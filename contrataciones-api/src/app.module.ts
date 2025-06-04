import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RequerimientoplanModule } from './requerimientoplan/requerimientoplan.module';
import { PlanesModule } from './planes/planes.module';
import { RpaModule } from './rpa/rpa.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { SolprocesoModule } from './solproceso/solproceso.module';
import { TipoprocesoModule } from './tipoproceso/tipoproceso.module';
import { FormaContratacionModule } from './forma-contratacion/forma-contratacion.module';
import { FormaAdjudicacionModule } from './forma-adjudicacion/forma-adjudicacion.module';
import { ClasificadorModule } from './clasificador/clasificador.module';
import { MetodoSeleccionAdjudicModule } from './metodo-seleccion-adjudic/metodo-seleccion-adjudic.module';
import { EstadoProcesoModule } from './estado-proceso/estado-proceso.module';
import { UnidadMedidaModule } from './unidad-medida/unidad-medida.module';
import { CertificadoPresupuestarioModule } from './certificado-presupuestario/certificado-presupuestario.module';
import { DatosConsultoriaModule } from './datos-consultoria/datos-consultoria.module';
import { DatosPacModule } from './datos-pac/datos-pac.module';
import { RequerimientoPlanSolprocesoModule } from './requerimiento-plan-solproceso/requerimiento-plan-solproceso.module';
import { RequerimientoProcesoModule } from './requerimiento-proceso/requerimiento-proceso.module';
import { DocumentoReferenciaModule } from './documento-referencia/documento-referencia.module';
import { NivelSalarialModule } from './nivel-salarial/nivel-salarial.module';
import { TipoPlanModule } from './tipo-plan/tipo-plan.module';
import { GeneraWordModule } from './genera-word/genera-word.module';
import { InformeverificacionModule } from './informeverificacion/informeverificacion.module';
import { InformeRecepcionModule } from './informe-recepcion/informe-recepcion.module';
import { InformeRecepcionResponsableAdminModule } from './informe-recepcion-responsable-admin/informe-recepcion-responsable-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    AuthModule,
    RequerimientoplanModule,
    PlanesModule,
    RpaModule,
    FuncionariosModule,
    SolprocesoModule,
    TipoprocesoModule,
    FormaContratacionModule,
    FormaAdjudicacionModule,
    ClasificadorModule,
    MetodoSeleccionAdjudicModule,
    EstadoProcesoModule,
    UnidadMedidaModule,
    CertificadoPresupuestarioModule,
    DatosConsultoriaModule,
    DatosPacModule,
    RequerimientoPlanSolprocesoModule,
    RequerimientoProcesoModule,
    DocumentoReferenciaModule,
    NivelSalarialModule,
    TipoPlanModule,
    GeneraWordModule,
    InformeverificacionModule,
    InformeRecepcionModule,
    InformeRecepcionResponsableAdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
