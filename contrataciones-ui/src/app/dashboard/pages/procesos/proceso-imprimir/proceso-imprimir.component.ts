import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { SolicitudProceso } from '../../../models/solicitud-proceso.model';
import { ApiService, AuthService, EstadosService, NotificacionService } from '../../../../core/services/services.index';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { UtilidadesService } from '../../../../core/services/utilidades.service';
import { CertificadoPresupuestario } from '../../../models/certificado-presupuestario.model';
import { CombosPoceso } from '../../../models/combos-proceso.model';
import { RequerimientoProceso } from '../../../models/requerimiento-proceso';
import { NgIf } from '@angular/common';
import { InformeVerifiacion, InformeVerifiacionColumns } from '../../../models/informe-verificacion.model';
import { TablaOpciones, TableColumnSchema } from '../../../../core/components/tabla-generica/tabla-column.model';
import { TablaGenericaComponent } from '../../../../core/components/tabla-generica/tabla-generica.component';
import { InformeRecepcion } from '../../../models/informe-recepcion.model';

@Component({
  selector: 'app-proceso-imprimir',
  imports: [NgIf, TablaGenericaComponent],
  templateUrl: './proceso-imprimir.component.html',
  styleUrl: './proceso-imprimir.component.css'
})
export class ProcesoImprimirComponent  implements OnChanges{
  private apiService = inject(ApiService);
  public estadosService = inject(EstadosService);
  public utilidadesService = inject(UtilidadesService);
  private notificacionService = inject( NotificacionService );

  @Input() idproceso !: number; // Recibe los datos como Input

  solicitud!: SolicitudProceso;
  certificacionesArray!: CertificadoPresupuestario[];
  combosArray!: CombosPoceso;
  requerimientosProceso!: RequerimientoProceso;
  
  infVerifTablaData: InformeVerifiacion[] = [];
  infVerifTablaColumns: TableColumnSchema[] = InformeVerifiacionColumns;
  infVerifTablaOpiones: TablaOpciones =  {
    // btnNuevo:false,
    // btnEliminar: true,
    btnCustom: {
      icono: '<i class="bi bi-printer-fill"></i>',
      colorClass: 'btn-light-success',
      tooltip: 'Imprimir'
    }
  }

  muestraTblaInformesVerif = false;

  infRecepData!: InformeRecepcion;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['idproceso'] && this.idproceso > 0) {

      forkJoin([
          this.apiService.getSolicitudById(this.idproceso),
          this.apiService.getAllInformeVerificacionByProceso(this.idproceso),
          this.apiService.getInformeRececionByProceso(this.idproceso)
      ]).subscribe({
        next: ([responseSolicitud, responseInformes, respRecp]) => {
          this.solicitud = responseSolicitud;
          this.infVerifTablaData = responseInformes
          this.infRecepData = respRecp;

          if (this.infVerifTablaData.length > 0 )
            this.disableBtnInfVerif = false;
          else
            this.disableBtnInfVerif = true;

          if (this.infRecepData ) {

            this.disableBtnInfRecepcion = false;
          }
          else
            this.disableBtnInfRecepcion = true;

        },
        error: (err) => {
          console.error('Error al obtener datos:', err);
          this.notificacionService.showError('Error al obtener datos :', 'Error!!!')
        }
      });


      // this.apiService.getSolicitudById(this.idproceso).pipe(
      //   tap(responseSolicitud => {

      //       this.solicitud = responseSolicitud;

      //       console.log(">>>>", responseSolicitud);

      //     }),
            
      //   ).subscribe();

    }
  }

  disableBtnInfRecepcion = true;
  disableBtnInfVerif = true;
  isGenerating = false;
  error: string | null = null;
  printSolContrat() {

    this.muestraTblaInformesVerif = false;

    this.isGenerating = true;
    this.error = null;
    
    this. apiService.generaProceso(this.idproceso).subscribe({
      next: (blob: Blob) => {
        this.descargarDocumento(blob);
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error al generar el documento', err);
        this.error = 'Ocurrió un error al generar el documento. Por favor, intenta nuevamente.';
        this.isGenerating = false;
      }
    });
  }

  printInformeVerificacion(objeto) {

    this.isGenerating = true;
    this.error = null;
    
    this. apiService.generaInformeVerificacion(objeto.id).subscribe({
      next: (blob: Blob) => {
        this.descargarDocumento(blob);
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error al generar el documento', err);
        this.error = 'Ocurrió un error al generar el documento. Por favor, intenta nuevamente.';
        this.isGenerating = false;
      }
    });


  }

  private descargarDocumento(blob: Blob): void {
    // Crear una URL para el blob
    const url = window.URL.createObjectURL(blob);
    
    // Crear un elemento <a> invisible para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    
    // Nombre del archivo para la descarga
    // const nombreArchivo = `si.docx`;
    // const nombreArchivo = `${this.documentoData.nombre.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
    const nombreArchivo = `${this.solicitud.id.toString()}.Proceso__${new Date().toISOString().split('T')[0]}.docx`;
    a.download = nombreArchivo;
    
    // Agregar al DOM, hacer clic y luego eliminar
    document.body.appendChild(a);
    a.click();
    
    // Limpiar
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  muestraTablaInformesVerificacion() {
    this.muestraTblaInformesVerif = true;
  }

  printInformeRecepcion() {
    this.muestraTblaInformesVerif = false

    this.isGenerating = true;
    this.error = null;

    this. apiService.generaInformeRecepcion(this.idproceso).subscribe({
      next: (blob: Blob) => {
        this.descargarDocumento(blob);
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error al generar el documento', err);
        this.error = 'Ocurrió un error al generar el documento. Por favor, intenta nuevamente.';
        this.isGenerating = false;
      }
    });

  }

}
