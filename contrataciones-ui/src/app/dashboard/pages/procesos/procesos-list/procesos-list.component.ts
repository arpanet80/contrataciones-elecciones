import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TablaGenericaComponent } from '../../../../core/components/tabla-generica/tabla-generica.component';
import { ApiService } from '../../../../core/services/api.service';
import { EstadosService } from '../../../../core/services/estados.service';
import { NotificacionService } from '../../../../core/services/notificacion.service';
import { SolicitudProceso, SolicitudProcesoColumns } from '../../../models/solicitud-proceso.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TablaOpciones, TableColumnSchema } from '../../../../core/components/tabla-generica/tabla-column.model';
import { ProcesoImprimirComponent } from '../proceso-imprimir/proceso-imprimir.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlMessagesComponent } from '../../../../core/services/validation-controls/control-messages.component';
import { InformeVerifiacion } from '../../../models/informe-verificacion.model';
declare var $: any;          // para usar jquery


@Component({
  selector: 'app-procesos-list',
  imports: [ TablaGenericaComponent, ProcesoImprimirComponent,  ReactiveFormsModule,
    ControlMessagesComponent
    // FormsModule,
   ],
  templateUrl: './procesos-list.component.html',
  styleUrl: './procesos-list.component.css'
})

export class ProcesosListComponent implements OnInit{
  private apiService = inject(ApiService);
  public estadosService = inject(EstadosService);
  private notificacionService = inject(NotificacionService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);  // Inyectamos ChangeDetectorRef

  idPlanActivo = 3;     /// SOLO PARA ELECCIONES GENERALES
  initialFormValues: any; // Guardaremos los valores iniciales

  solicitudesTablaData: SolicitudProceso[] = [];
  solicitudesTablaColumns: TableColumnSchema[] = SolicitudProcesoColumns;
  solicitudesTablaOpiones: TablaOpciones =  {
    btnNuevo:true,
    btnEliminar: true,
    btnCustom: {
      icono: '<i class="bi bi-pencil-fill"></i>',
      colorClass: 'btn-light-success',
      tooltip: 'Registrar informes'
    },
    btnCustom1: {
      icono: '<i class="bi bi-printer-fill"></i>',
      colorClass: 'btn-light-info',
      tooltip: 'Imprimir'
    },
  }

  informeForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  getControl(nombre: string): FormControl {
      return this.informeForm.get(nombre) as FormControl;
    } 
    
  ngOnInit(): void {

    this.cargaDatos();

    ////////////// FORMULARIO /////////////////////////////////

    // Formatea la fecha actual al formato que espera el input de tipo 'date' (YYYY-MM-DD)
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${anio}-${mes}-${dia}`; 

    this.informeForm = this.fb.group({
      idsolicitud: [0, Validators.required],
      fechainforme: [fechaFormateada, Validators.required],
      razonsocial: ['', Validators.required],
      representantelegal: ['', Validators.required],
      cedula: ['', Validators.required],
      fechaentrega: [fechaFormateada, Validators.required],
      // items: [''],
      copianit: [true],
      certificadonit: [true],
      seprec: [true],
      copiaci: [true],
      gestora: [true],
      sigep: [true],
      formulario2b: [true],
      rupe: [true],
      ofertatecnica: [true],
      cumpledocumentos: [true],
      cumpleofertaadj: [true],
    });

    // Guardamos los valores iniciales del formulario
    this.initialFormValues = this.informeForm.value;

    // Escuchamos los cambios en el checkbox ofertatecnica
    this.informeForm.get('ofertatecnica')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpleofertaadj: value });
    });


    this.informeForm.get('copianit')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('certificadonit')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('seprec')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('copiaci')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('gestora')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('sigep')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('formulario2b')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });
    this.informeForm.get('rupe')?.valueChanges.subscribe(value => {
      this.informeForm.patchValue({ cumpledocumentos: value });
    });

  }

  cargaDatos() {

    this.apiService.getSolicitudProcesoByIdplanIdunodadorganizacional(
      this.idPlanActivo,
      Number(this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional)
    ).subscribe({
      next: (resp) => {
        this.solicitudesTablaData = resp;

        resp.forEach(elemento => {
          const respuesta = this.solicitudesTablaData.find(r => r.id === elemento.id);
          if (respuesta) {
            respuesta.tipoprocesoTexto = elemento.tipoproceso.nombre; 
          }
        });

        // Notificar a Angular que detecte cambios
        this.changeDetectorRef.detectChanges();  // Fuerza la actualización de la vista
      },
    });
  }

  btnNUevoRegistro(val: any) {

    // window.location.href = '/dashboard/procesos/nuevo'
    this.router.navigate(['/dashboard/procesos/nuevo'])
      .then(() => {
        window.location.reload();
      });

  }
  
  btnEliminar(id) { 
  
      if (id > 0) {
        
        Swal.fire({
          title: 'Se eliminara el registro seleccionado de la base de datos. Desea continuar??',
          text: 'No podra recuperar la informacion eliminada!',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Si, quiero continuar!',
          confirmButtonColor: 'LightSeaGreen',
          cancelButtonText: 'No, mantenga la info',
          cancelButtonColor: 'Crimson',
        }).then((result) => {
          if (result.value) {
  
            this.apiService.deleteSolicitudProceso(id).subscribe({
              next: (resp) => {
  
                  this.notificacionService.showSuccess('Eliminado correctamente', 'Exito!!!')
                  this.cargaDatos();
                
              },
              error:(err) => {
                this.notificacionService.showError('Se produjo un error al realizar la accion!', 'Exito!!!');
              }
            });
  
          } 
        })
  
      }
  
  }

  // solicitudSeleccionada: any;
  btnEditar(objeto) {

    this.idsolicitudseleccionada = objeto.id;

    if (objeto) {
      $("#kt_modal_edit").modal("show");

      this.informeForm.patchValue({idsolicitud: objeto.id });

      // this.solicitudSeleccionada = this.solicitudesTablaData.filter(objeto => objeto.id === objeto.id);

      // console.log(this.solicitudSeleccionada);
      
    }

  }

  // public solicitudSelected!: SolicitudProceso;
  idsolicitudseleccionada = 0;
  btnImprimir(objeto) {
    // console.log("IMPRIMIR", objeto.id);

    this.idsolicitudseleccionada = objeto.id;

    $("#kt_modal_imprimir_proceso").modal("show");

  }

  formatearFecha(date: Date | null): string | null {
    if (!date) {
      return null;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  guardarInformeVrificacion() {

      if (this.informeForm.valid)  {

        const informeRawValue = this.informeForm.getRawValue();
        const fechaEntregaValue = this.informeForm.get('fechaentrega')?.value;
        const fechaEntregaFormateada = fechaEntregaValue ? this.formatearFecha(new Date(fechaEntregaValue)) : null;

        const informe: InformeVerifiacion = {
          ...informeRawValue,
          fechainforme: new Date(informeRawValue.fechainforme), // Convertimos fechainforme a Date
          fechaentrega: fechaEntregaFormateada, // Enviamos fechaentrega como string formateado
          cedula: String( informeRawValue.cedula)
        };

        this.apiService.addInformeVerificacion(informe).subscribe({
          next: (resp) => {

            this.printInformeVerificacion(resp.id);

            this.notificacionService.showSuccess('Éxito...', `El proceso fue correctamente registrado`);

            $("#kt_modal_edit").modal("hide");

            // this.informeForm.reset(this.initialFormValues);

          }
        });

      }
      else {
       Object.values(this.informeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      }
  }

  isGenerating = false;
  error: string | null = null;
  printInformeVerificacion(id: number | undefined) {

    this.isGenerating = true;
    this.error = null;
    if (id) {
      
      this. apiService.generaInformeVerificacion(id).subscribe({
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

  private descargarDocumento(blob: Blob): void {
    // Crear una URL para el blob
    const url = window.URL.createObjectURL(blob);
    
    // Crear un elemento <a> invisible para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    
    // Nombre del archivo para la descarga
    // const nombreArchivo = `si.docx`;
    // const nombreArchivo = `${this.documentoData.nombre.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
    const nombreArchivo = `${this.idsolicitudseleccionada.toString()}.Informe_Verif__${new Date().toISOString().split('T')[0]}.docx`;
    a.download = nombreArchivo;
    
    // Agregar al DOM, hacer clic y luego eliminar
    document.body.appendChild(a);
    a.click();
    
    // Limpiar
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}

