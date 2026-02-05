import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacionService } from '../../../../core/services/notificacion.service';
import { ApiService, EstadosService } from '../../../../core/services/services.index';
import { RequerimientoPlan, RequerimientoPlanColumns } from '../../../models/requerimiento-plan.model';
import { read, utils } from 'xlsx';
import { TablaGenericaComponent } from '../../../../core/components/tabla-generica/tabla-generica.component';
import Swal from 'sweetalert2';
import { TablaOpciones, TableColumnSchema } from '../../../../core/components/tabla-generica/tabla-column.model';
declare var $: any;          // para usar jquery

@Component({
  selector: 'app-importar-plan-operativo',
  imports: [ReactiveFormsModule, TablaGenericaComponent],
  templateUrl: './importar-plan-operativo.component.html',
  styleUrl: './importar-plan-operativo.component.css'
})
export class ImportarPlanOperativoComponent implements OnInit {

  private apiService = inject( ApiService );
  public  estadosService = inject( EstadosService );
  private notificacionService = inject( NotificacionService );
  private changeDetectorRef = inject(ChangeDetectorRef);  // Inyectamos ChangeDetectorRef
  
  idPlanActivo = 5;     /// SOLO PARA ELECCIONES SUBNACIONALES

  /////////// auxiliares //////////////////
  requerimientos: RequerimientoPlan[] = [];
  requerimientosParaImportar: any[] = [];

  ////////// Estados //////////////////////////
  mostrarBotonImportar: boolean = false;
  escondeRequisitos: boolean = true;  
  muestraTablaBase: boolean = false;
  mostrarAlerta = false;

/////////////////// TABLA REQUERIMIENTOS ///////////////////////////////
  requerimientosTablaData: RequerimientoPlan[] = [];
  requerimientosTablaColumns:TableColumnSchema[] = RequerimientoPlanColumns;
  requerimientosTablaOpiones:TablaOpciones =  {
    btnNuevo:false,
    btnEditarEnTabla:true,
    btnEliminar: true,
  }
//////////////////////////////////////////////////////////////

/////////////////// TABLA IMPORTE DE EXCEL ///////////////////////////////
importEcelTablaData: RequerimientoPlan[] = [];
importEcelColumns:TableColumnSchema[] = RequerimientoPlanColumns;
/////////////////////////////////////////////////////////////////////////

  cargaRequisitos() {
    this.apiService.getRequerimientosPlanUnidadOrganiz(this.idPlanActivo, this.estadosService.estadoFuncionario()?.cargo.unidadorganizacional.id).subscribe({
      next: (resp) => {

        console.log(resp);

        if (resp.length >  0 ) {

          // this.data = resp;
          this.requerimientosTablaData = resp;
          this.changeDetectorRef.detectChanges();

          this.muestraTablaBase = true; 
          this.mostrarAlerta = false;
          this.escondeRequisitos = true
          this.mostrarBotonImportar = false;
          

          /////////// INICIALIZA EL FORMULARIO  //////////////////////////
          /*this.form.patchValue({
            idplan: this.estadosService.planSeleccionado()?.id,
            idunidadorganizacional: this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional,
            idfuncionario: Number(this.estadosService.estadoUsuario()?.idfuncionario),
          });*/

        }
        else {
          this.mostrarAlerta = true;
          // this.mostrarTablaImportada = false; 
          this.escondeRequisitos = false;
        }
      },
      error: (error) => {
        if (error === 'SinRegistros') {
          this.mostrarAlerta = true;
          // this.mostrarTablaImportada = false; 
          this.escondeRequisitos = false;
        }
      }
      
    });
  }

  ngOnInit(): void {
    if (this.estadosService.estadoFuncionario()) {
      this.cargaRequisitos()
    }
  }


  ReemplazarRequerimientos(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        title: 'text-muted'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Se eliminaran todos los registros de importaciones anteriores. Desea continuar??',
      text: 'No podra recuperar la informacion eliminada!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Si, quiero continuar!',
      cancelButtonText: 'No, mantenga la info'
    }).then((result) => {
      if (result.value) {

        this.apiService.deleteByPlanUO(this.estadosService.planSeleccionado()?.id, this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional ).subscribe({
          next: (resp) => {

            Swal.fire(
              'Eliminado!',
              'Las importaciones anteriores fueron eliminadas.',
              'success'
            )

            this.muestraTablaBase  = false;
            this.escondeRequisitos = false;

          },
          error:(err) => {
            this.notificacionService.showError('Se produjo un error al realizr la importacion!', 'Exito!!!');
          }
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Se mantendra la informacion :)',
          'error'
        )
      }
    })

  }

  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                this.requerimientosParaImportar = rows;
            }
        }
        reader.readAsArrayBuffer(file);
    }

  }


  SubirJson(json: any) {
    if (json.length > 0) {

      if (json[0]["Partida"] != null || json[0]["Partida"] != undefined) {

        for (let index = 0; index < json.length; index++) {

          //console.log("Columna 2", json[index]["Partida"].split(' ')[0]);

          this.requerimientos.push({
            idplan: this.idPlanActivo, //Number(this.estadosService.planSeleccionado()?.id),
            idunidadorganizacional: this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional,
            partida: String(json[index]["Partida"].split(' ')[0]),
            fuente: String(json[index]["Fuente Financiamiento"]),
            requerimiento: String(json[index]["Requerimiento"]),
            unidad: String(json[index]["Unidad de medida"]),
            cantidad: Number(json[index]["Cantidad"]),
            preciounitario: Number(json[index]["Precio Unitario"]),
            plazo: Number(json[index]["Plazo"]),
            inicial: Number(json[index]["INICIAL"]),
            movimientomas: Number(json[index]["MovimientosMas"]),
            movimientomenos: Number(json[index]["MovimientosMenos"]),
            actual: Number(json[index]["Actual"]),
            certificacion: Number(json[index]["Certificacion Poa"]),
            saldo: Number(json[index]["Saldo"]),
            actividad: String(json[index]["Actividad"]),
            resultadosalcanzados: String(json[index]["resultadosalcanzados"]),
            idfuncionarioimport: this.estadosService.estadoFuncionario()?.id,
            codigopac: String(json[index]["codigopac"])
          });

        } // Fin for

        this.importEcelTablaData = this.requerimientos;
        // this.dataImportExcel = this.requerimientos;

        this.mostrarBotonImportar = true;
      }
      else {

        this.notificacionService.showError("Hubo un problema al cargar el archivo seleccionado. No tiene el formato adecuado", "Error en archivo Excel");
        this.mostrarBotonImportar = false;

        return;

      }

    }
    else {
      this.notificacionService.showError("No ha seleccionado un archivo Excel valido", "Error en archivo Excel");
      return;

    }

  }

  GuararRequerimientos() {



    this.apiService.addRequerimientosArray(this.requerimientos).subscribe({
      next: (resp) => {

        this.notificacionService.showSuccess('Los registros se insertaron correctamente!', 'Exito!!!');
        
        this.mostrarAlerta = false;
        this.escondeRequisitos = false;
        this.muestraTablaBase = false;

        this.cargaRequisitos();

      },
      error:(err) => {
        this.notificacionService.showError('Se produjo un error al realizr la importacion!', 'Exito!!!');
      }
    });

  }

  btnEliminar(id) { 

    console.log(id);

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

          this.apiService.deleteRequerimiento(id).subscribe({
            next: (resp) => {
              
              // Swal.fire(
                //   'Eliminado!',
                //   'El egistro fue eliminada.',
                //   'success'
                // )
                this.notificacionService.showSuccess('Eliminado correctamente', 'Exito!!!')
                this.cargaRequisitos();

            },
            error:(err) => {
              this.notificacionService.showError('Se produjo un error al realizr la importacion!', 'Exito!!!');
            }
          });

        } 
        /*else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Se mantendra la informacion :)',
            'warning'
          )
        }*/
      })

    }

  }

  btnEditar(row) {

    let id = Number(row.id);
      delete row.id;          // Quita el campo del objeto porque el back no lo espera
      delete row.updatedAt;
      delete row.createdAt
      delete row.isEdit;

      this.apiService.updateRequerimiento(id, row).subscribe({
        next: (resp) => {
          this.notificacionService.showSuccess("El registro se guardo correctamente!!", "Exito!!");
          this.cargaRequisitos()
          // window.location.reload() 

        },
      });
  }

  btnNUevoRegistro(val: any) {

    $("#kt_modal_add_equipo").modal("show");

  }

  btnCustom(objeto) {

    console.log("Aprestaste INFO", objeto);
  }

}

  
