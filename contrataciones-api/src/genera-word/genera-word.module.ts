import { Module } from '@nestjs/common';
import { GeneraWordService } from './genera-word.service';
import { GeneraWordController } from './genera-word.controller';
import { SolprocesoModule } from 'src/solproceso/solproceso.module';
import { RequerimientoProcesoModule } from 'src/requerimiento-proceso/requerimiento-proceso.module';
import { ClasificadorModule } from 'src/clasificador/clasificador.module';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { FormaAdjudicacionModule } from 'src/forma-adjudicacion/forma-adjudicacion.module';
import { MetodoSeleccionAdjudicModule } from 'src/metodo-seleccion-adjudic/metodo-seleccion-adjudic.module';
import { ProveedorModule } from 'src/proveedor/proveedor.module';
import { DatosConsultoriaModule } from 'src/datos-consultoria/datos-consultoria.module';
import { NivelSalarialModule } from 'src/nivel-salarial/nivel-salarial.module';
import { UnidadMedidaModule } from 'src/unidad-medida/unidad-medida.module';
import { InformeverificacionModule } from 'src/informeverificacion/informeverificacion.module';

@Module({
  imports: [
    SolprocesoModule, RequerimientoProcesoModule, ClasificadorModule, FuncionariosModule, FormaAdjudicacionModule, MetodoSeleccionAdjudicModule,
    ProveedorModule, DatosConsultoriaModule, NivelSalarialModule, UnidadMedidaModule, InformeverificacionModule
  ],
  controllers: [GeneraWordController],
  providers: [GeneraWordService],
})
export class GeneraWordModule {}
