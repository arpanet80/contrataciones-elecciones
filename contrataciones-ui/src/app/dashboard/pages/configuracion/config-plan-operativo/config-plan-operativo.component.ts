import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { NotificacionService } from '../../../../core/services/notificacion.service';
import { Plan } from '../../../models/plan.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstadosService } from '../../../../core/services/estados.service';
import { Rpa } from '../../../models/rpa.model';
import { MatOption, MatSelect } from '@angular/material/select';
import Swal from "sweetalert2";
declare var $: any;          // para usar jquery

@Component({
  selector: 'app-config-plan-operativo',
  imports: [
    MatFormFieldModule, MatSelect, MatOption, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    ReactiveFormsModule, FormsModule, CommonModule
],
  templateUrl: './config-plan-operativo.component.html',
  styleUrl: './config-plan-operativo.component.css'
})

export class ConfigPlanOperativoComponent implements OnInit {
  private apiService = inject( ApiService );
  public estadosService = inject( EstadosService );
  private notificacionService = inject( NotificacionService );
  private fbuilder = inject( FormBuilder );

  // Definicion de la tabla Planes Anuales
  displayedColumns: string[] = ['id', 'abreviacion', 'nombre', 'gestion', 'acciones'];
  dataSource = new MatTableDataSource<Plan>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  // Definicion de la tabla RPA
  displayedColumnsRpa: string[] = [  'nombreapellidos', 'acciones'];
  dataSourceRpa = new MatTableDataSource<Rpa>([]);
  usuariosCombo: any[] = [];
  
  /////// Formulario nueo ln
  idfuncionario = this.estadosService.estadoUsuario()?.idfuncionario
  anio = (new Date()).getFullYear().toString()

  form = this.fbuilder.group({
    abreviacion: ['', Validators.required],
    nombre: ['', Validators.required],
    gestion: [String(this.anio), Validators.required],
    idfuncionario: [ Number(this.idfuncionario), Validators.required]
  });

  ngOnInit() {
    this.cargaPlanesActivos();
    this.cargaRpaActivo()

    this.apiService.getAllFuncionarios().subscribe(res => {
      this.usuariosCombo = res;
    });
  }

  cargaPlanesActivos() {

    this.apiService.getAllPlanes().subscribe({
      next: (resp) => {
        this.dataSource.data = resp;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  cargaRpaActivo() {

    this.apiService.getRpaActivo().subscribe({
      next: (resp) => {
        this.dataSourceRpa.data = [resp];
      }
    });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  GuardarPlan() {

    if (this.form.valid) {

      const plan = {
        abreviacion: this.form.value.abreviacion || '', // Si es null o undefined, reemplazar por ''
        nombre: this.form.value.nombre || '',           // Lo mismo para otros campos
        gestion: this.form.value.gestion || '',         // Asegúrate de que 'gestion' no sea null/undefined
        idfuncionario: this.form.value.idfuncionario || 0, // Reemplaza por 0 si es null/undefined
      };

      this.apiService.addPlan(plan).subscribe({
        next: (resp) => {
          this.notificacionService.showSuccess('El registro se inserto correctamente!','Exito!!!');
          this.form.reset();
          this.cargaPlanesActivos();
        },
        error:(err) => {
          this.notificacionService.showError('Hubo un error en el registro!','Error!!!');
        }
      });
    }
  }

  
  desahabilitarRpa(id: number) {

    this.apiService.deleteRpa(id).subscribe({
      next: (resp) => {
        this.notificacionService.showSuccess('El RPA se desahbilito correctamente!','Exito!!!');
        this.dataSourceRpa.data = [];
        this.cargaRpaActivo();
      },
      error:(err) => {
        this.notificacionService.showError('Hubo un error en el registro!','Error!!!');
      }
    });
  }

  selectedRpaActivo(idusuario: number) {

    if (this.dataSourceRpa.data.length > 0) {
      
      Swal.fire({
        title: 'Ya existe un RPA attivo',
        text: 'Desea reemplazar al RPA por el usuario seleccionado?!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, quiero continuar!',
        cancelButtonText: 'No, mantenga la info'
      }).then((result) => {
        if (result.value) {
          
          this.apiService.deshabilitaEInserta(idusuario).subscribe({
            next: (resp) => {
              this.notificacionService.showSuccess('RPA habilitado correctamente!','Exito!!!');
              this.cargaRpaActivo();
            },
            error:(err) => {
              this.notificacionService.showError('Hubo un error en el registro!','Error!!!'+err);
            }
          });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          /*Swal.fire(
            'Cancelado',
            'Se mantendra la informacion :)',
            'error'
          )*/
        }
      })

    }
    else {

      this.apiService.deshabilitaEInserta(idusuario).subscribe({
        next: (resp) => {
          this.notificacionService.showSuccess('RPA habilitado correctamente!','Exito!!!');
          this.cargaRpaActivo();
        },
        error:(err) => {
          this.notificacionService.showError('Hubo un error en el registro!','Error!!!'+err);
        }
      });
    }

  }

  nuevoPlan() {
    $("#kt_modal_add_equipo").modal("show");
  }

  desahabilitar(id: number) {

    this.apiService.deletePlan(id).subscribe({
      next: (resp) => {
        this.notificacionService.showSuccess('El plan se desahbilito correctamente!','Exito!!!');
        this.cargaPlanesActivos();
      },
      error:(err) => {
        this.notificacionService.showError('Hubo un error en el registro!','Error!!!');
      }
    });
  }


}
