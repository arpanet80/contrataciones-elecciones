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
declare var $: any;          // para usar jquery


@Component({
  selector: 'app-procesos-list',
  imports: [ TablaGenericaComponent, ProcesoImprimirComponent ],
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

  solicitudesTablaData: SolicitudProceso[] = [];
  solicitudesTablaColumns: TableColumnSchema[] = SolicitudProcesoColumns;
  solicitudesTablaOpiones: TablaOpciones =  {
    btnNuevo:true,
    btnEliminar: true,
    btnCustom: {
      icono: '<i class="bi bi-pencil-fill"></i>',
      colorClass: 'btn-light-success',
      tooltip: 'Editar'
    },
    btnCustom1: {
      icono: '<i class="bi bi-printer-fill"></i>',
      colorClass: 'btn-light-info',
      tooltip: 'Imprimir'
    },
  }

  ngOnInit(): void {

        this.apiService.getRpaActivo().subscribe({
          next: (rpa) => {
            this.estadosService.estadoRpa.set(rpa);

            console.log(rpa);
            this.cargaDatos();
          }
        });
        
  }

  private mostrarAlertaYRedirigir(): void {
      const estadoUsuario = this.estadosService.estadoUsuario();
  
      if (!estadoUsuario || !estadoUsuario.permisos || estadoUsuario.permisos.length === 0) {
          console.error("Error: No se encontró el usuario o no tiene permisos definidos.");
          return;
      }
  
      const rolUsuario = Number(estadoUsuario.permisos[0].idrol);
      console.log("Rol del usuario:", rolUsuario); // 🛠 Verificar en consola
  
      if (rolUsuario === 1) {
          Swal.fire({
              icon: "error",
              title: "Error",
              text: "No existen requerimientos importados en el plan seleccionado. Debe importar los requerimientos antes de continuar.",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#d33" // 🔴 Rojo oscuro
          }).then(() => {
              console.log("Redirigiendo a dashboard/config/importarplan");
              this.router.navigate(['/dashboard', 'config', 'importarplan']); // ✅ Mejor forma en Angular
          });
      } else {
          Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "No existen requerimientos importados en el plan seleccionado. Contáctese con el administrador.",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "#ffc107" // 🟡 Amarillo (warning)
          }).then(() => {
              console.log("Redirigiendo a dashboard/home");
              this.router.navigate(['/dashboard', 'home']); // ✅ Mejor forma en Angular
          });
      }
  }

  cargaDatos() {

    // console.log(this.estadosService.planSeleccionado()?.id);
    // console.log(this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional);

    this.apiService.getSolicitudProcesoByIdplanIdunodadorganizacional(
      this.idPlanActivo,
      Number(this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional)
    ).subscribe({
      next: (resp) => {
        this.solicitudesTablaData = resp;


        // console.log(this.solicitudesTablaData);

        resp.forEach(elemento => {
          const respuesta = this.solicitudesTablaData.find(r => r.id === elemento.id);
          if (respuesta) {
            respuesta.tipoprocesoTexto = elemento.tipoproceso.nombre; 
            // console.log(respuesta)
          }
        });

        // console.log(this.solicitudesTablaData);

        // Notificar a Angular que detecte cambios
        this.changeDetectorRef.detectChanges();  // Fuerza la actualización de la vista
      },
    });
  }

  btnNUevoRegistro(val: any) {


    
    // this.router.navigate(['/dashboard', 'procesos', 'nuevo']);
    
    // this.router.navigate(['/dashboard', 'config', 'importarplan']); 
    
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

    btnEditar(objeto) {

      $("#kt_modal_edit").modal("show");

      // console.log("EDITAR", objeto);
  
    }

  // public solicitudSelected!: SolicitudProceso;
  idsolicitudseleccionada = 0;

  btnImprimir(objeto) {
    // console.log("IMPRIMIR", objeto.id);

    this.idsolicitudseleccionada = objeto.id;

    $("#kt_modal_imprimir_proceso").modal("show");


    /*
    this.apiService.getSolicitudById(objeto.id).subscribe({
      next: (resp) => {

        this.solicitudSelected = resp;

        $("#kt_modal_imprimir_proceso").modal("show");

      }
    });
*/


      
/*

      document.body.focus(); // Mueve el foco fuera del modal para evitar errores al cerrar el  modal
      $("#kt_modal_seleccion_requerimientos").modal("hide");

*/


    }

}
