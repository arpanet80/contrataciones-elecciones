import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { SolicitudProceso } from '../../../models/solicitud-proceso.model';
import { ApiService, AuthService, EstadosService } from '../../../../core/services/services.index';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { UtilidadesService } from '../../../../core/services/utilidades.service';
import { CertificadoPresupuestario } from '../../../models/certificado-presupuestario.model';
import { CombosPoceso } from '../../../models/combos-proceso.model';
import { RequerimientoProceso } from '../../../models/requerimiento-proceso';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-proceso-imprimir',
  imports: [NgIf],
  templateUrl: './proceso-imprimir.component.html',
  styleUrl: './proceso-imprimir.component.css'
})
export class ProcesoImprimirComponent  implements OnChanges{
  private reportsService = inject( ReportsService );
  private authService = inject( AuthService );
  private apiService = inject(ApiService);
  public estadosService = inject(EstadosService);
  public utilidadesService = inject(UtilidadesService);


  @Input() idproceso !: number; // Recibe los datos como Input

  // parametrosReporte: { nombre: string, valor: string }[] = [];

  solicitud!: SolicitudProceso;
  certificacionesArray!: CertificadoPresupuestario[];
  combosArray!: CombosPoceso;
  requerimientosProceso!: RequerimientoProceso;

  public esAdquisicion = false;

  ngOnChanges(changes: SimpleChanges): void {

    // this.parametrosReporte = [];
    this.esAdquisicion = false;

    if (changes['idproceso'] && this.idproceso > 0) {

      this.apiService.getSolicitudById(this.idproceso).pipe(
        tap(responseSolicitud => {

          this.solicitud = responseSolicitud;

          console.log(">>>>", responseSolicitud);

        }),
        
      ).subscribe();
    }
  }

  isGenerating = false;
  error: string | null = null;
  printSolContrat() {

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

  printEspecificaciones() {
    
  }

  printInexistencia() {

  }

  printFUC() {
  }

}
