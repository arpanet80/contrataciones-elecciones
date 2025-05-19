import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { SolicitudProceso } from '../../../models/solicitud-proceso.model';
import { ApiService, AuthService, EstadosService } from '../../../../core/services/services.index';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { UtilidadesService } from '../../../../core/services/utilidades.service';
import { CertificadoPresupuestario } from '../../../models/certificado-presupuestario.model';
import { CombosPoceso } from '../../../models/combos-proceso.model';

@Component({
  selector: 'app-proceso-imprimir',
  imports: [],
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

  parametrosReporte: { nombre: string, valor: string }[] = [];

  solicitud!: SolicitudProceso;
  certificacionesArray!: CertificadoPresupuestario[];
  combosArray!: CombosPoceso;

  public esAdquisicion = false;

  ngOnChanges(changes: SimpleChanges): void {

    this.parametrosReporte = [];
    this.esAdquisicion = false;

    if (changes['idproceso'] && this.idproceso > 0) {
      
      this.apiService.getSolicitudById(this.idproceso).pipe(
        tap(solicitud => {

          this.solicitud = solicitud;

          // console.log(solicitud);

          if (solicitud.idtipoproceso === 1) {
            this.esAdquisicion = true;
          }
          
          this.parametrosReporte.push({ nombre: 'idsol', valor: solicitud.id.toString()});
          this.parametrosReporte.push({ nombre: 'idtipoproceso', valor: solicitud.idtipoproceso.toString()});
          this.parametrosReporte.push({ nombre: 'fechaliteral', valor: this.utilidadesService.formatDate(solicitud.fechasolicitud)});
          this.parametrosReporte.push({ nombre: 'objetocontratacion', valor: solicitud.objetocontratacion.toUpperCase() });
          this.parametrosReporte.push({ nombre: 'preciototal', valor: solicitud.preciototal.toString()});
          this.parametrosReporte.push({ nombre: 'preciototalliteral', valor: this.utilidadesService.formatearNumero(solicitud.preciototal)});
          this.parametrosReporte.push({ nombre: 'plan', valor: this.estadosService.planSeleccionado()?.nombre ?? '' });
          this.parametrosReporte.push({ nombre: 'tipoplan', valor: this.estadosService.planSeleccionado()?.tipoplan?.nombre.toUpperCase() ?? '' });
          this.parametrosReporte.push({ nombre: 'tipoplanabreviado', valor: this.estadosService.planSeleccionado()?.tipoplan?.abreviacion ?? '' });
          
          // FUC
          this.parametrosReporte.push({ nombre: 'fechacorta', valor: this.utilidadesService.fechaCorta(solicitud.fechasolicitud)});
          this.parametrosReporte.push({ nombre: 'correlativo', valor: solicitud.correlativounidad + '/' + this.utilidadesService.soloAnio(solicitud.fechasolicitud)});
          this.parametrosReporte.push({ nombre: 'meses', valor: this.utilidadesService.calcularPlazoEntrega(solicitud.plazoentrega).meses.toString() });
          this.parametrosReporte.push({ nombre: 'dias', valor: this.utilidadesService.calcularPlazoEntrega(solicitud.plazoentrega).dias.toString() });
          this.parametrosReporte.push({ nombre: 'formacontratacion', valor: solicitud.idformacontratacion.toString() });
          this.parametrosReporte.push({ nombre: 'codigopac', valor: solicitud.codigopac ? solicitud.codigopac.toString() : '.' });
          if (solicitud.idtipoproceso === 3) {
            this.parametrosReporte.push({ nombre: 'nivelsalarial', valor: solicitud.idnivelsalarial.toString() });
            this.parametrosReporte.push({ nombre: 'honorariomensual', valor: solicitud.honorariomensual.toString() });
            this.parametrosReporte.push({ nombre: 'numerocasos', valor: solicitud.numerocasos.toString() });
          }

          /// Personal 
          this.parametrosReporte.push({ nombre: 'especificaciones', valor: solicitud.especificaciones });
          this.parametrosReporte.push({ nombre: 'justificacion', valor: solicitud.justificacion });
          this.parametrosReporte.push({ nombre: 'condicionescomplementarias', valor: solicitud.condicionescomplementarias });
          this.parametrosReporte.push({ nombre: 'formalizacion', valor: solicitud.formalizacion });
          this.parametrosReporte.push({ nombre: 'plazoentrega', valor: solicitud.plazoentrega.toString() });
          this.parametrosReporte.push({ nombre: 'lugarentrega', valor: solicitud.lugarentrega });
          this.parametrosReporte.push({ nombre: 'instalacion', valor: solicitud.instalacion });
          this.parametrosReporte.push({ nombre: 'garantia', valor: solicitud.garantia });
          this.parametrosReporte.push({ nombre: 'idformaadjudic', valor: solicitud.idformaadjudic.toString() });
          this.parametrosReporte.push({ nombre: 'idmetodoseleccionadjudic', valor: solicitud.idmetodoseleccionadjudic.toString() });
          

          switch (solicitud.idtipoproceso) {
            case 1:         // Adquisicion
              this.parametrosReporte.push({ nombre: 'subdetalle', valor: 'I. DETALLE DEL(LOS) BIEN(ES)' });
              this.parametrosReporte.push({ nombre: 'contdetalle', valor:  solicitud.objetocontratacion.toUpperCase()});
              
              break;

            case 2:         // Servicio
              // console.log("servicio");
              this.parametrosReporte.push({ nombre: 'subdetalle', valor: 'I. DESCRIPCIÓN DEL SERVICIO' });
              this.parametrosReporte.push({ nombre: 'contdetalle', valor:  solicitud.descripcion});
              break;
          
            default:
              break;
          }
        }),
        
        switchMap(() => this.apiService.getCertificadoPresupuestarioBySProceso(this.solicitud.id)),
        tap(certificacionesArray => {

          this.certificacionesArray = certificacionesArray;

          // console.log("certificacionesArray: ", certificacionesArray)
        }),


        switchMap(() => this.apiService.getCombosSolProceso()),
        tap(combosArray => {

          let partidasLiteral = '';

          const descripcionesPartidas: string[] = this.certificacionesArray.map(certificacion => {

              const partidaInfo = combosArray.clasificadorPartidas.find(partida => partida.partida === certificacion.partida);

              return partidaInfo ? `${certificacion.partida} (${partidaInfo.descripcion})` : certificacion.partida;
          });

          // Si hay más de un elemento, los unimos con coma
          if (descripcionesPartidas.length > 1) {
              partidasLiteral = descripcionesPartidas.join(", ");
          }
          else {
            partidasLiteral = descripcionesPartidas[0];
          }

          this.parametrosReporte.push({ nombre: 'partidasliteral', valor: partidasLiteral});

          const formaadjudic = combosArray.formaAdjudic.find(z => z.id === this.solicitud.idformaadjudic);
          this.parametrosReporte.push({ nombre: 'formaadjudic', valor: formaadjudic ? formaadjudic.detalle : 'No especificado'  });

          const metodoseleccionadjudic = combosArray.metodoSeleccion.find(z => z.id === this.solicitud.idmetodoseleccionadjudic);
          this.parametrosReporte.push({ nombre: 'metodoseleccionadjudic', valor: metodoseleccionadjudic ? metodoseleccionadjudic.detalle : 'No especificado'  });

        }),

        switchMap(() => this.apiService.getRpaActivo()),
        tap(rpa => {
          // console.log("rpa activo: ", rpa)
        }),
  
        switchMap(rpa => forkJoin({
          funcionarioRpa: this.authService.getFuncionarioById(rpa.idusuario),
          rpaData: of(rpa) // Para mantener los datos de RPA en la cadena
        })),
        tap(({ funcionarioRpa }) => {

          this.parametrosReporte.push({ nombre: 'nombrerpa', valor: this.utilidadesService.toTitleCase(funcionarioRpa.formacion.prefijo + ' ' + funcionarioRpa.nombres + ' ' + funcionarioRpa.paterno + ' ' + funcionarioRpa.materno) });

          // console.log("funcionario rpa", funcionarioRpa)
        }),
        
        switchMap(() => this.authService.getUnidadOrganizacionalById(this.solicitud.idunidadoperativa)),
        tap(unidadOrganizacional => {

          this.parametrosReporte.push({ nombre: 'cite', valor: unidadOrganizacional.abreviacion + '-' + this.estadosService.planSeleccionado()?.abreviacion + '-Nº ' + this.solicitud.correlativounidad + '/' + this.estadosService.planSeleccionado()?.gestion });
          this.parametrosReporte.push({ nombre: 'unidadsolicitante', valor: unidadOrganizacional.unidad });
          
          this.parametrosReporte.push({ nombre: 'codactiv', valor: unidadOrganizacional.abreviacion + '-' + this.estadosService.planSeleccionado()?.abreviacion + '/' + this.estadosService.planSeleccionado()?.gestion });
        }),
        
        
        /*switchMap(({ funcionarioRpa, rpaData }) => forkJoin({
          unidadOrganizacional: this.authService.getUnidadOrganizacionalById(this.solicitud.idunidadoperativa),
          funcionarioRpa: of(funcionarioRpa), // Mantener datos
          rpaData: of(rpaData)
        })),*/

        /*
        switchMap(() => this.authService.getFuncionarioById(3)), // Última llamada
        tap(func => {
          console.log("func: ", func)
        })*/
        
      ).subscribe();
    }
  }

  printSolContrat() {

    // const parametros = [
    //   { nombre: 'nombre', valor: 'Dante' },
    //   { nombre: 'apellido', valor: 'Ibañez' },
    // ];

    // this.parametrosReporte.push({ nombre: 'nombre', valor: 'Dante' },)
    // this.parametrosReporte.push({ nombre: 'apellido', valor: 'Ibañez' },)

    // console.log(this.parametrosReporte);

    this.reportsService.GeneraPDF('solicitud.trdp', this.parametrosReporte)
    .subscribe(response => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  printEspecificaciones() {
    this.reportsService.GeneraPDF('especificaciones.trdp', this.parametrosReporte)
    .subscribe(response => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  printInexistencia() {

    this.reportsService.GeneraPDF('Inexistencia.trdp', this.parametrosReporte)
    .subscribe(response => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  printFUC() {

    this.reportsService.GeneraPDF('fuc.trdp', this.parametrosReporte)
    .subscribe(response => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });

    


    /*
    // Muestra la ventana de imprimir por 5 segundos 

    this.reportsService.GeneraPDF('fuc.trdp', this.parametrosReporte)
    .subscribe(response => {
      const blob = new Blob([response.body!], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // ✅ Crear un iframe oculto para cargar el PDF
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);

      // ✅ Esperar a que el iframe cargue y luego imprimir
      iframe.onload = () => {
        iframe.contentWindow?.print();

        Eliminar el iframe después de la impresión
        setTimeout(() => {
          document.body.removeChild(iframe);
          window.URL.revokeObjectURL(url);
        }, 5000);
      };
    });

    */
  }


/*
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("Cambio: ", this.estadosService.estadoRpa());
  
    if (changes['idproceso'] && this.idproceso > 0) {
      
      this.apiService.getSolicitudById(this.idproceso).pipe(
        tap(solicitud => {
          console.log("solicitud: ", solicitud);
        }),
  
        switchMap(() => this.apiService.getRpaActivo()),
        tap(rpa => {
          console.log("rpa activo: ", rpa)
        }),
  
        switchMap(rpa => forkJoin({
          funcionarioRpa: this.authService.getFuncionarioById(rpa.idusuario),
          rpaData: of(rpa) // Para mantener los datos de RPA en la cadena
        })),
        tap(({ funcionarioRpa }) => {
          console.log("funcionario rpa", funcionarioRpa)
        }),
  
        switchMap(({ funcionarioRpa, rpaData }) => forkJoin({
          unidadOrganizacional: this.authService.getUnidadOrganizacionalById(funcionarioRpa.idtipofuncionario),
          funcionarioRpa: of(funcionarioRpa), // Mantener datos
          rpaData: of(rpaData)
        })),
        tap(({ unidadOrganizacional }) => {
          console.log("Unidad organizacional", unidadOrganizacional)
        }),
  
        switchMap(() => this.authService.getFuncionarioById(3)), // Última llamada
        tap(func => {
          console.log("func: ", func)
        })
        
      ).subscribe();
    }
  }

*/


/*
  ngOnChanges(changes: SimpleChanges): void {

    console.log("Cambio: ", this.estadosService.estadoRpa())

    if (changes['idproceso'] && this.idproceso > 0) {

      this.apiService.getSolicitudById(this.idproceso).subscribe({

        next: (solicitud) => {

          console.log("solicitud: ", solicitud);

          this.apiService.getRpaActivo().subscribe({

            next: (rpa) => {

              console.log("rpa activo: ", rpa);
      
              this.authService.getFuncionarioById(rpa.id).subscribe({

                next: (funcionario) => {

                  console.log("funcionario rpa", funcionario);

                  this.authService.getUnidadOrganizacionalById(funcionario.idtipofuncionario).subscribe({
                    
                    next: (unidorg) => {

                      console.log("Unidad organizacional");

                      this.authService.getFuncionarioById(1).subscribe({

                        next: (func) => {
                  
                          console.log(func);
                  
                        }
                      });
                    }
                  });

                }
              });

            }
          });
        }
      });
    }
  }
*/

  /*
  ngOnChanges(changes: SimpleChanges): void {

    // if (changes['solicitud'] && this.solicitud?.idusuariorpa !== undefined) {
    //   this.authService.getFuncionarioById(this.solicitud.idusuariorpa).subscribe({
    //     next: (resp) => {
    //       console.log(resp);
    //     }
    //   });
    // }

    if (changes['idproceso'] && this.idproceso > 0 ) {

      this.apiService.getSolicitudById(this.idproceso).subscribe({
        next: (resp) => {
  
        this.authService.getFuncionarioById(resp.idusuariorpa).subscribe({
          next: (resp) => {

        console.log(resp);  
          }
        });

        }
      });
      
  }
}
*/


  // ngOnInit(): void {
  //   if (this.solicitud?.idusuariorpa !== undefined) {
  //     this.authService.getFuncionarioById(this.solicitud.idusuariorpa).subscribe({
  //       next: (resp) => {
  //         console.log(resp);
  //       }
  //     });
  //   } else {
  //     console.warn("idusuariorpa no está definido, no se puede obtener el funcionario.");
  //   }
  // }


  
  

}
