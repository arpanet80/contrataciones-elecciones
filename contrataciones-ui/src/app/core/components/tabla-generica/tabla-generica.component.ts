import { Component, Input, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableColumnSchema } from './tabla-column.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-tabla-generica',
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule,
    ReactiveFormsModule, FormsModule,  
    CommonModule
],
  templateUrl: './tabla-generica.component.html',
  styleUrl: './tabla-generica.component.css'
})

export class TablaGenericaComponent<T> implements OnChanges, AfterViewInit  {
  @Input() data: any[] = []; // Recibe los datos como Input
  @Input() tablaColumns: TableColumnSchema[] = [];
  @Input() tablaOpciones: any = {};

  //// Par el filtro ///////////////////////
  @Input() columnaFiltro: string = ''; // Nombre de la columna para filtrar
  columnaFiltroLabel: string = '';
  filtroOpciones: any[] = [];
  // dataSource = new MatTableDataSource<any>([]);
  filtroSeleccionado: string = '';
  textoBusqueda: string = '';
  ///////////////////////////////////////////

  ////// Botones ///////////////
  btnNuevo = output<boolean>();
  btnEditarEnTabla = output<any>();
  btnEliminar = output<number>();
  btnCustom = output<any>();
  btnCustom1 = output<any>();
  btnCustom2 = output<any>();
  btnCustom3 = output<any>();
  
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  valid: any = {}
  columnasMostradas!: string[];
  esquemaColumna!: TableColumnSchema[];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {

      this.dataSource.data = this.data; // Actualiza el dataSource con los nuevos datos
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //// Par el filtro ///////////////////////
      this.obtenerOpcionesFiltro();
    }

    //// Par el filtro ///////////////////////
    if (changes['columnaFiltro']) {
      this.columnaFiltroLabel = this.tablaColumns.find(col => col.key === this.columnaFiltro)?.label || '';
      this.obtenerOpcionesFiltro();
    }
    this.setCustomFilterPredicate(); // Añadimos el filtro personalizado


    if (changes['tablaColumns']) {

      if (!(this.tablaOpciones?.btnEliminar || this.tablaOpciones?.btnEditarEnTabla || this.tablaOpciones?.btnCustom || this.tablaOpciones?.btnCustom1 || this.tablaOpciones?.btnCustom2 || this.tablaOpciones?.btnCustom3)) {

        this.tablaColumns.pop();
        
      }

      this.columnasMostradas = this.tablaColumns.map(col => col.key);
      this.esquemaColumna = this.tablaColumns;

      this.actualizarColumnas();


    }

    

  }


  actualizarColumnas(): void {
    // Implementa la lógica necesaria para actualizar las columnas en la tabla
  }
  
  /////// Para el filtro /////////////////////////////
  setCustomFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterObj = JSON.parse(filter);
      const cumpleFiltroTexto = Object.values(data).some(value =>
        value?.toString().toLowerCase().includes(filterObj.textoBusqueda)
      );
      const cumpleFiltroSelect = filterObj.filtroSeleccionado ? data[this.columnaFiltro] === filterObj.filtroSeleccionado : true;
      return cumpleFiltroTexto && cumpleFiltroSelect;
    };
  }

  obtenerOpcionesFiltro() {
    if (this.columnaFiltro) {
      this.filtroOpciones = [...new Set(this.data.map(item => item[this.columnaFiltro]))].filter(Boolean);
    }
  }

  // applySelectFilter(event: Event) {
  //   const filterValue = (event.target as HTMLSelectElement).value;
  //   this.dataSource.filterPredicate = (data, filter) => filter ? data[this.columnaFiltro] === filter : true;
  //   this.dataSource.filter = filterValue;
  // }

  applyFilters() {
    const filterObj = { textoBusqueda: this.textoBusqueda, filtroSeleccionado: this.filtroSeleccionado };
    this.dataSource.filter = JSON.stringify(filterObj);
  }

  applySelectFilter(event: Event) {
    this.filtroSeleccionado = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  applySearchFilter(event: Event) {
    this.textoBusqueda = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilters();
  }
  ////////////////////////////////////////////////////////////////////

/*
  setCustomFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const transformedFilter = filter.trim().toLowerCase();
  
      // Aseguramos que las propiedades no sean undefined antes de aplicar el filtro
      return this.esquemaColumna.some(col => {
        const value = data[col.key];
        if (value) {
          // Si el valor de la columna es un string, lo comparamos con el filtro
          return value.toString().toLowerCase().includes(transformedFilter);
        }
        return false;
      });
    };
  }
    */


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Obtiene el valor del filtro
    this.dataSource.filter = filterValue; // Establece el filtro en el dataSource
  
    // Si el filtro cambia el valor, esto asegura que el paginator se reinicie
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  saveRow(row: any) {
    row.isEdit = false
    this.btnEditarEnTabla.emit(row);
    row.isEdit = false
  }
  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  cancelRow(row: any) {
    row.isEdit = false
  }
  
  
}

