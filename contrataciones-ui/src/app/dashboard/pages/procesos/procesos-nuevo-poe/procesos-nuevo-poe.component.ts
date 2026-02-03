import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { EstadosService } from '../../../../core/services/estados.service';
import { TipoProceso } from '../../../models/tipo-proceso.model';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlMessagesComponent } from "../../../../core/services/validation-controls/control-messages.component";
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequerimientoPlan } from '../../../models/requerimiento-plan.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemsProceso, ItemsProcesoColumns } from '../../../models/items-proceso';
import { ClasificadorPartida, CombosPoceso } from '../../../models/combos-proceso.model';
import { NotificacionService } from '../../../../core/services/notificacion.service';
import Swal from 'sweetalert2';
import { QuillModule } from 'ngx-quill';
import { SolicitudProceso } from '../../../models/solicitud-proceso.model';
import { Router, RouterLink } from '@angular/router';
import { ReportsService } from '../../../../core/services/reports.service';
import { UtilidadesService } from '../../../../core/services/utilidades.service';
import { ProcesoImprimirComponent } from '../proceso-imprimir/proceso-imprimir.component';
import { forkJoin } from 'rxjs';

declare var $: any;           // Carga JQuery
declare var KTStepper: any;  // Declaración de KTStepper global que esta dentro de scripts.bundle.js

@Component({
  selector: 'app-procesos-nuevo',
  imports: [ ProcesoImprimirComponent,
    FormsModule, ReactiveFormsModule, ControlMessagesComponent, CommonModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule, MatCheckboxModule, 
    QuillModule, RouterLink
  ],
  templateUrl: './procesos-nuevo-poe.component.html',
  styleUrl: './procesos-nuevo-poe.component.css'
})

export class ProcesosNuevoPoeComponent implements OnInit, AfterViewInit {
  private apiService = inject(ApiService);
  public estadosService = inject(EstadosService);
  public fbuilder = inject(FormBuilder);
  private notificacionService = inject( NotificacionService );
  private reportsService = inject( ReportsService );
  private router = inject( Router );
  public utilidadesService = inject(UtilidadesService);
  
  public tipoProcesoArray: TipoProceso[] = [];
  public combosProceso!: CombosPoceso;
  public solicitudGuardada!: SolicitudProceso;
  public resumenArray: {nombre: string, valor: string}[] = [];
  
  idPlanActivo = 5;     /// SOLO PARA ELECCIONES GENERALES
  tipoContratacion = 0;
  
  public editorConfig = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Tamaño de encabezados
      ['bold', 'italic', 'underline', 'strike'], // Negrita, cursiva, subrayado, tachado
      [{ list: 'ordered' }, { list: 'bullet' }], // Listas ordenadas y desordenadas
      [{ script: 'sub' }, { script: 'super' }], // Subíndice y superíndice
      [{ indent: '-1' }, { indent: '+1' }], // Sangría
      [{ align: [] }], // Alineación
      ['blockquote', 'code-block'], // Bloque de cita y código
      ['link', 'image', 'video'], // Insertar enlaces, imágenes y videos
      ['clean'] // Quitar formato
    ]
  };


  idsolicitudseleccionada= 0;
  // especificacionesText = '';

  public formIniciofContrat!: FormGroup; // Declarar la variable sin inicializar
  public formCertificacion!: FormGroup; // Declarar la variable sin inicializar

  constructor(private fb: FormBuilder) {
    
    this.formCertificacion = this.fb.group({
      registros: this.fb.array([]) // FormArray para manejar múltiples filas dinámicas
    });
    this.agregarFila(); // Agregar la primera fila al cargar el componente

    this.formIniciofContrat = this.fb.group({
      idtipoproceso: [null, Validators.required],
      preciototal: [null as number | null, [Validators.required, Validators.min(1)]],
      plazoentrega: [5, Validators.required],
      objetocontratacion: ['', Validators.required],
      idformacontratacion: [1, Validators.required],
      idformaadjudic: [1, Validators.required],
      idmetodoseleccionadjudic: [4, Validators.required],

      ///// empresa //////////
      razonsocial: [''],
      representantelegal: [''],
      cirepresentantelegal: [''],
      nit: [''],
      
      /// Datos PAC ////// (OPCIONAL)
      codigopac: [null as string | null],  
      
      ////////// Personal /////////////////// (OPCIONALES)
      idnivelsalarial: [null as number | null, [Validators.min(1)]],
      honorariomensual: [null as number | null, [Validators.min(1)]],
      numerocasos: [null as number | null, [Validators.min(1)]],
      observaciones: [null as string | null], 
      
      //////////////// Certificacion (Formulario Anidado) ///////////////////
      certificacion: this.formCertificacion ,

      requerimientos: [[] as RequerimientoPlan[], Validators.required],
      itemsProceso: [[] as ItemsProceso[], Validators.required],
    });

    // ✅ Agregar validación condicional cuando cambia `idtipoproceso`
    this.formIniciofContrat.get('idtipoproceso')?.valueChanges.subscribe(value => {
      const descripcionControl = this.formIniciofContrat.get('descripcion');

      if (value === 2) {
        descripcionControl?.setValidators(Validators.required);
      } else {
        descripcionControl?.clearValidators();
      }

      descripcionControl?.updateValueAndValidity(); // ✅ Se actualiza la validación
    });
  }

  getControl(nombre: string): FormControl {
    return this.formIniciofContrat.get(nombre) as FormControl;
  } 
  
  ngOnInit(): void {

      this.inicializaStepper();
      this.cargaDatos();
      this.formIniciofContrat.markAllAsTouched();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  inicializaSelect2() {
    $('select[data-control="select2"]').each((index, element) => {
      const hideSearch = $(element).data('hide-search');
      if (hideSearch === true) {
        $(element).select2({ minimumResultsForSearch: Infinity });
      } else {
        $(element).select2();
      }
    });

  }

  inicializaStepper() {
    // const element = document.querySelector("#kt_stepper_example_basic");
    // const stepper = new KTStepper(element);

    // El stepper del modal
    const elementRequerimiento = document.querySelector("#kt_stepper_requerimientos");
    const stepperRequerimiento = new KTStepper(elementRequerimiento);

    // Handle next step
    // stepper.on("kt.stepper.next", function (stepper) {
    //   stepper.goNext();
    // });
    stepperRequerimiento.on("kt.stepper.next", function () {
      stepperRequerimiento.goNext(); // go next step
    });

    // Handle previous step
    // stepper.on("kt.stepper.previous", function (stepper) {
    //   stepper.goPrevious();
    // });

    stepperRequerimiento.on("kt.stepper.previous", function () {
      stepperRequerimiento.goPrevious(); // go previous step
  });

  }



  cargaDatos() {

    forkJoin([
      this.apiService.getAllTipoProceso(),
      this.apiService.getCombosSolProceso()
    ]).subscribe({
      next: ([tipoProcesoResp, combosSolResp]) => {
        this.tipoProcesoArray = tipoProcesoResp;
        this.combosProceso = combosSolResp;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
        this.notificacionService.showError('Error al obtener datos :', 'Error!!!')
      }
    });

  }

  btnSelectRequerimDisabled = true;
  /////////// Señeccopm de los radiobox //////////////////////////
  onChangeSeleccion(selectedObject: TipoProceso) {

    // console.log('Objeto seleccionado:', selectedObject.nombre);
    // console.log('Objeto seleccionado:', selectedObject.id);
    this.tipoContratacion = selectedObject.id

    this.btnSelectRequerimDisabled = false;

  }
  
  openDialogSeleccionRequerimientos() {
    
    // this.especificacionesText = this.formIniciofContrat.get('especificaciones')?.value;

    $("#kt_modal_seleccion_requerimientos").modal("show");

    this.apiService.getRequerimientosPlanUnidadOrganiz(
      this.idPlanActivo, 
      this.estadosService.estadoFuncionario()?.cargo.idunidadorganizacional).subscribe({
        next: (resp) => {
                    
          this.requerimientosPlanSeleccinadoArray = resp.filter(item => item.tipocontratacion === this.tipoContratacion);;

          //// Para la tabla ///////////////
          this.dataSource = new MatTableDataSource(this.requerimientosPlanSeleccinadoArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          ///////Para que funcione el fltro //////////
          // Aquí agregamos el filtro personalizado asegurándonos de devolver un booleano
          this.dataSource.filterPredicate = (data: RequerimientoPlan, filter: string) => {
            const transformedFilter = filter.trim().toLowerCase();  // Aseguramos que el filtro no tenga espacios y sea en minúsculas
            
            // Verificamos que las propiedades no sean undefined antes de aplicar .toLowerCase()
            const isRequerimientoMatch = data.requerimiento ? data.requerimiento.toLowerCase().includes(transformedFilter) : false;
            const isUnidadMatch = data.unidad ? data.unidad.toLowerCase().includes(transformedFilter) : false;
            const isIdMatch = data.id ? data.id.toString().includes(transformedFilter) : false;
            const isPartidaMatch = data.partida ? data.partida.toString().includes(transformedFilter) : false;
            
            return isRequerimientoMatch || isUnidadMatch || isIdMatch || isPartidaMatch;
          };
          
        },
    });
  }


  guardarProceso() {

    this.formIniciofContrat.markAllAsTouched();
    
    if (!this.formIniciofContrat.invalid) {
      
      // console.log('Formulario válido', this.formIniciofContrat.value);
      
      let solicitud: SolicitudProceso = this.formIniciofContrat.getRawValue() as SolicitudProceso;
      const unidadOrg = this.estadosService.estadoFuncionario()?.cargo.unidadorganizacional?.id;

      if (unidadOrg) {
        solicitud.idunidadoperativa = unidadOrg;
        solicitud.idusuariosolicitante = this.estadosService.estadoUsuario()?.idfuncionario ?? 0;
        solicitud.cantidadtotal = 1;
        solicitud.iddocumentoreferencia = 1;
        solicitud.idestadoproceso =  1;
        solicitud.numerofojas = 0;
        // solicitud.idusuarioaprobador =  dependencia
        // solicitud.idusuariorpa = this.estadosService.planSeleccionado().
        solicitud.idplan = this.idPlanActivo;     //this.estadosService.planSeleccionado()?.id  ?? 0;
        
      } else {
        this.notificacionService.showError('Oops...', "No se encontró la Unidad Organizacional");
      }

      this.apiService.addSolicitudProceso(solicitud).subscribe({
        next: (resp) => {

          this.solicitudGuardada = resp;
          this.idsolicitudseleccionada = resp.id

          this.notificacionService.showSuccess('Éxito...', `El proceso fue correctamente registrado`);

          $("#kt_modal_imprimir_proceso").modal("show");

        }
      });

    }
   
  }

 
  isControlsValid(): boolean {
    return !(
      this.formIniciofContrat.get('idtipoproceso')?.valid &&
      this.formIniciofContrat.get('requerimientos')?.valid &&
      this.formIniciofContrat.get('itemsProceso')?.valid &&
      this.formIniciofContrat.get('preciototal')?.valid &&
      this.formIniciofContrat.get('tiempoentregadias')?.valid &&
      this.formIniciofContrat.get('objetocontratacion')?.valid &&
      this.formIniciofContrat.get('idformacontratacion')?.valid &&
      this.formIniciofContrat.get('idformaadjudic')?.valid &&
      this.formIniciofContrat.get('idmetodoseleccionadjudic')?.valid
    );
  }

  get idTipoProceso(): number {
    return Number(this.formIniciofContrat.get('idtipoproceso')?.value) || 0;
  }

  obtenerCamposInvalidos(form: FormGroup, prefix: string = ''): string[] {
    let camposInvalidos: string[] = [];
  
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        // Si es un FormGroup (anidado), buscar dentro de él
        camposInvalidos = camposInvalidos.concat(this.obtenerCamposInvalidos(control, `${prefix}${key}.`));
      } else if (control?.invalid) {
        // Si es inválido, agregar el nombre del campo a la lista
        camposInvalidos.push(`${prefix}${key}`);
      }
    });
  
    return camposInvalidos;
  }

  stepSubmitModal() {

    // Saca el resumen de las partitas y su total
    // console.log("this.dataSourceItems.data", this.dataSourceItems.data);

    const resumenPartidas = this.dataSourceItems.data.reduce((acc, item) => {
      if (item.partida) {
        if (acc[item.partida]) {
          acc[item.partida] += item.total || 0;
        } else {
          acc[item.partida] = item.total || 0;
        }
      }
      return acc;
    }, {} as Record<string, number>);

    // Convertir el objeto a un array de objetos [{ partida, totalActual }]
    const itemResumen  = Object.entries(resumenPartidas).map(([partida, totalActual]) => ({
      partida,
      totalActual,
    }));

    //// Busca si en el ultimo existe alguno mayor 
    const diferencias = itemResumen.map(item => {
      const partidaAnterior = this.partidasResumenArray.find(p => p.partida === item.partida);
      return {
        partida: item.partida,
        totalActualNuevo: item.totalActual,
        totalActualAnterior: partidaAnterior ? partidaAnterior.totalActual : 0,
        esMayor: item.totalActual > (partidaAnterior ? partidaAnterior.totalActual : 0)
      };
    });
    
    // Filtrar solo las partidas donde el segundo array es mayor
    const partidasMayores = diferencias.filter(d => d.esMayor);

    if (partidasMayores.length > 0) {

      const partidasMayoresCadena = partidasMayores.map(d => d.partida).join(", ");
      this.notificacionService.showError('Oops...', `La/s partida/s: ${partidasMayoresCadena} que intenta ejecutar es superior al presupuesto programado. Revise sus montos`);

    } else {
      document.body.focus(); // Mueve el foco fuera del modal para evitar errores al cerrar el  modal
      $("#kt_modal_seleccion_requerimientos").modal("hide");

      const costoTotalProceso = this.dataSourceItems.data.reduce((acumulador, item) => {
        return acumulador + (item.total || 0); // Si total es null/undefined, usa 0
      }, 0);
      
      this.formIniciofContrat.patchValue({
        requerimientos: this.selectedRowsRequerimientosPlan,
        itemsProceso: this.dataSourceItems.data,
        preciototal: costoTotalProceso,
        objetocontratacion: this.selectedRowsRequerimientosPlan[0].objetocontratacion
      });

    }

    document.body.focus(); // Mueve el foco fuera del modal para evitar errores al cerrar el  modal
    $("#kt_modal_seleccion_requerimientos").modal("hide");
  }

  stepSiguinteModal() {

    // Obtener partidas únicas y sumar sus valores de "actual"
    const partidasResumen = this.selectedRowsRequerimientosPlan.reduce((acc, item) => {
      if (item.partida) {
        // Si la partida ya está en el acumulador, suma el valor de "actual"
        if (acc[item.partida]) {
          acc[item.partida] += item.actual || 0;
        } else {
          acc[item.partida] = item.actual || 0;
        }
      }
      return acc;
    }, {} as Record<string, number>);

    // Convertir el objeto a un array de objetos [{ partida, totalActual }]
    this.partidasResumenArray = Object.entries(partidasResumen).map(([partida, totalActual]) => ({
      partida,
      totalActual
    }));


    this.partidasSeleccionadas = [...new Set(this.selectedRowsRequerimientosPlan.map(item => item.partida))];  // Sin duplicados

    // Filtrar el objeto clasificadorPartidas para obtener solo las partidas seleccionadas
    this.combosPartidas = this.combosProceso.clasificadorPartidas.filter(partida => 
      this.partidasSeleccionadas.includes(partida.partida)
    );

    // Carga el dataSource de la tabla

    this.dataSourceItems.data = this.selectedRowsRequerimientosPlan.map(item => {
      // Buscar en combosProceso.unidadMedida el id correspondiente a la descripción
      const unidadEncontrada = this.combosProceso.unidadMedida.find(unidad => unidad.descripcion === item.unidad);
    
      return new ItemsProceso(
        false, // Valor por defecto para isSelected
        item.id || 0, // Asumiendo que id de RequerimientoPlan es equivalente a idrequerimientoplan
        item.unidad || '0',
        item.cantidad || 0, // Asumiendo que cantidad es la misma
        parseInt(item.partida || '0', 10), // Convierte partida a número
        item.preciounitario || 0, // Lo mismo para precio unitario
        item.actual || 0, // Lo mismo para precio unitario
        // (item.cantidad || 0) * (item.preciounitario || 0), // Cálculo de total
        item.requerimiento || '', // Asumiendo que requerimiento es el mismo campo en ambos modelos
        false ,// Valor por defecto para isEdit
        unidadEncontrada ? unidadEncontrada.id : 0,// ✅ Corrección aquí
      );
    });


  }

  ////////////////////////// begin TABLA SELECCION DE REQUERIMIENTOS ///////////////////////////////////
  // Variables de la tabla
  requerimientosPlanSeleccinadoArray: RequerimientoPlan[] = [];
  displayedColumns: string[] = ['select', 'id', 'requerimiento', 'unidad', 'cantidad', 'actual', 'partida'];
  dataSource: MatTableDataSource<RequerimientoPlan> = new MatTableDataSource(this.requerimientosPlanSeleccinadoArray);
  selection = new SelectionModel<RequerimientoPlan>(true, []);
  selectedRowsRequerimientosPlan: RequerimientoPlan[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /////////////////////////////////////////////////////////////////////////////
    
  /** Cuando cambia de estado el check al hacer clic sobre el checkbox */
  onChangeDemo(ob: MatCheckboxChange, row) {
    this.selection.toggle(row);
    this.updateSelectedRows();
  }

  /** Cuando se hace clic en la fila */
  onSel(row) {
    this.selection.toggle(row);
    this.updateSelectedRows();
  }

  /** Actualiza la lista de filas seleccionadas */
  updateSelectedRows() {
    this.selectedRowsRequerimientosPlan = this.selection.selected;
  }

  /** Aplica el filtro a la tabla */
  applyFilter(event: Event) {
    // Requiere el fragmento que esta al cargar los daos /////
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue; // No es necesario el .trim().toLowerCase() en el 'dataSource.filter' si ya lo estás haciendo
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Habilitar/deshabilitar el botón "Siguiente" */
  isNextButtonDisabled() {
    return this.selection.selected.length === 0;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  ////////////////////////// end TABLA SELECCION DE REQUERIMIENTOS ///////////////////////////////////


  ////////////////////////// begin TABLA ITEMS PROCESO ///////////////////////////////////
  dataSourceItems = new MatTableDataSource<ItemsProceso>()
  displayedColumnsItems: string[] = ItemsProcesoColumns.map((col) => col.key)
  columnsSchemaItems: any = ItemsProcesoColumns
  valid: any = {}
  /////////////////////////////////////////////////////////////////////////
  partidasSeleccionadas : any[] = [];
  partidasResumenArray!: { partida: string; totalActual: number }[];
  idTemporal = 1000000;
  combosPartidas!: ClasificadorPartida [];

  removeSelectedRows() {
    const users = this.dataSourceItems.data.filter((u: ItemsProceso) => u.isSelected)

    const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
            title: 'text-muted'
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: 'Atencion !!!',
          text: 'Desea eliminar el registro?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: 'Si, quiero continuar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
    
            this.dataSourceItems.data = this.dataSourceItems.data.filter(
              (u: ItemsProceso) => !u.isSelected,
            )
          } 
        })
  }

  selectAllTablaItems(event: any) {
    this.dataSourceItems.data = this.dataSourceItems.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }

  isAllSelectedTablaItems() {
    return this.dataSourceItems.data.every((item) => item.isSelected)
  }

  isAnySelectedTablaItems() {
    return this.dataSourceItems.data.some((item) => item.isSelected)
  }

  
  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  addRow() {
    
    const newRow = new ItemsProceso(false,this.idTemporal, '', 0, 0, 0, 1, '', true )
    this.idTemporal++

    this.dataSourceItems.data = [newRow, ...this.dataSourceItems.data]

  }
  
  removeRow(row: ItemsProceso) {

    this.dataSourceItems.data = this.dataSourceItems.data.filter(
        (u: ItemsProceso) => u.idrequerimientoplan !== row.idrequerimientoplan
      );

    // Es importante que después de actualizar data, llames a esto para forzar la actualización de la tabla
    // this.dataSourceItems._updateChangeSubscription();
  }

  editRow(row: ItemsProceso) {

    // console.log("Partida actual:", row.partida);
  
    row.originalData = { ...row }; // Almacenamos una copia de los datos para cancelar
    row.isEdit = true;

  }

  saveRow(row: ItemsProceso) {

    if (row.requerimiento != '' && row.cantidad != 0 && row.preciounitario != 0) {
      
      // Actualizar total al guardar
      row.total = row.cantidad * row.preciounitario;
      
      // const unidadEncontrada = this.combosProceso.unidadMedida.find(
      //   unidad => unidad.id === parseInt(row.unidad)
      // );
      // row.unidad = unidadEncontrada ? unidadEncontrada.descripcion : '';

      // 🔹 Si `row.unidad` es un string, buscar su equivalente en `this.combosProceso.unidadMedida`
    // if (typeof row.unidad === 'string') {
      const unidadEncontrada = this.combosProceso.unidadMedida.find(
        unidad => unidad.descripcion === row.unidad
      );
      row.idunidadmedida = unidadEncontrada ? unidadEncontrada.id : 0;
    /*} else {
      // 🔹 Si `row.unidad` ya es un número, convertirlo a entero
      row.idunidadmedida = parseInt(row.unidad as any, 10);
    }*/
      
      row.isEdit = false;  // Cambiar a modo no edición

    } else {
      this.notificacionService.showError('Oops...', 'Debe llenar todos los campos requeridos! (Requerimiento, Cantidad, Precio Unitario y Partida');
    }

  }

  cancelRow(row: any) {

    //// viene con datos para editar
    if (row.originalData) {
      // Restauramos los valores originales
      row.requerimiento = row.originalData.requerimiento;
      row.cantidad = row.originalData.cantidad;
      row.preciounitario = row.originalData.preciounitario;
      row.partida = row.originalData.partida;
    }
    else{

      /// si esta vacio es nuevo registro vacio y se borra
      this.dataSourceItems.data = this.dataSourceItems.data.filter(
        (u: ItemsProceso) => u.idrequerimientoplan !== row.idrequerimientoplan
      );

    }
    row.isEdit = false; // Volvemos al modo de visualización
  }

  ///////////////////////////////////////////////////////////////////
  /////// FORMULARIO ANIDADO Certificacion
  ////////////////////////////////////////////////////////////////////
  
  // Obtener el FormArray de registros
  get registros(): FormArray {
    return this.formCertificacion.get('registros') as FormArray;
  }

  // Método para agregar una nueva fila
  agregarFila() {
    const nuevaFila = this.fb.group({
      preventivo: [null, [Validators.required, Validators.min(1)]],
      fecha: [null, Validators.required],
      importe: [null, [Validators.required, Validators.min(1)]],
      partida: [null, Validators.required] // Combo de partidas
    });

    this.registros.push(nuevaFila);
  }

  // Método para eliminar una fila por índice
  eliminarFila(index: number) {
    if (this.registros.length > 1) {
      this.registros.removeAt(index);
    }
  }

  getRegistroFormGroup(index: number): FormGroup {
    return this.registros.at(index) as FormGroup;
  }

  ////////////////// Resumen /////////////////////////
  
getRegistros(): any[] {
  return (this.formIniciofContrat.get('certificacion')?.get('registros') as FormArray)?.value || [];
}

///////////////////////////////////////////////
cerrarModalImpresion() {
  document.body.focus(); // Mueve el foco fuera del modal para evitar errores al cerrar el  modal
  $("#kt_modal_imprimir_proceso").modal("hide");

  this.router.navigate(['/dashboard/procesos/lista'])
      .then(() => {
        window.location.reload();
      });

}

cerrarX() {
  window.location.href = '/dashboard/procesos/lista';

  // this.router.navigate(['/dashboard/procesos/lista'])
  // .then(() => {
  //   window.location.reload();
  // });
}


obtenerControlesInvalidos(form: FormGroup): string[] {
  const controlesInvalidos: string[] = [];

  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);
    if (control && control.invalid) {
      controlesInvalidos.push(key);
    }
  });

  return controlesInvalidos;
}

comprobarForm() {

  if (this.formIniciofContrat.invalid) {
    const invalidos = this.obtenerControlesInvalidos(this.formIniciofContrat);
    console.log("Los siguientes controles son inválidos:", invalidos);
  }
  
}

////////////////// IMPRESION //////////////////////
printSolContrat() {

  const parametros = [
    { nombre: 'nombre', valor: 'Dante' },
    { nombre: 'apellido', valor: 'Ibañez' },
  ];

  this.reportsService.GeneraPDF('TestParam.trdp', parametros)
  .subscribe(response => {
    const blob = new Blob([response.body!], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  });

}
  

}

