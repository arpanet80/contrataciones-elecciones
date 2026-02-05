export interface RequerimientoPlan {
  idplan?: number,
  idunidadorganizacional?: number,
  partida?: string,
  fuente?: string,
  codigopac: string,
  requerimiento?: string,
  unidad?: string,
  cantidad?: number,
  preciounitario?: number,
  plazo?: number,
  inicial?: number,
  movimientomas?: number,
  movimientomenos?: number,
  actual?: number,
  certificacion?: number,
  saldo?: number,
  actividad?: string,
  resultadosalcanzados?: string,
  idfuncionarioimport?: number,
  activo?: boolean
  id?: number,

  fechaimporte?: Date,
  objetocontratacion?: string,
  tipocontratacion?: number,
  modalidadcontratacion?: number,
  pac?: boolean,
  messolicitud?: number,
  mespublicacion?: number,
  mespago?: number,
  categoria?: number,
  obs?: string,
  responsable?: number
}


export const RequerimientoPlanColumns = [
  {
    key: 'id',
    type: 'text',
    label: 'Id',
    style: 'width: 3%;',
    required: true,
    disabled: true,
    hidden: false
  },
  {
    key: 'requerimiento',
    type: 'text',
    label: 'Requerimiento',
    style: 'width: 40%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'cantidad',
    type: 'text',
    label: 'Cantidad',
    style: 'width: 10%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'actual',
    type: 'title',
    label: 'Preupuesto',
    style: 'width: 10%;',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'unidad',
    type: 'txt',
    label: 'Unidad',
    style: 'width: 10%;',
    required: false,
    disabled: true,
    hidden: false
  },
  {
    key: 'partida',
    type: 'text',
    label: 'Partida',
    style: 'width: 10%;',
    required: false,
    disabled: true,
    hidden: false
  },

  ///////////////////////////////////////////////
  ///// ESTE VA SI O SI /////////////////////////
  ///////////////////////////////////////////////
  {
    key: 'isEdit',
    type: 'button',
    label: 'Acciones',
    style: 'width: auto;',
    required: false,
    disabled: false,
    hidden: false
  },
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
];




/*
export class RequerimientoPlan {

  constructor (
  id?: number,
  idplan?: number,
  idunidadorganizacional?: number,
  partida?: string,
  fuente?: string,
  requerimiento?: string,
  unidad?: string,
  cantidad?: number,
  preciounitario?: number,
  plazo?: number,
  inicial?: number,
  movimientomas?: number,
  movimientomenos?: number,
  actual?: number,
  certificacion?: number,
  saldo?: number,
  actividad?: string,
  resultadosalcanzados?: string,
  idfuncionarioimport?: number,
  activo?: boolean

) {}

}

*/