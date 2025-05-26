import { ItemsProceso } from "./items-proceso";
import { RequerimientoPlan } from "./requerimiento-plan.model";
import { TipoProceso } from "./tipo-proceso.model";

export interface SolicitudProceso {

  id: number;
  idtipoproceso: number;
  idunidadoperativa: number;
  idusuariosolicitante: number;
  idformacontratacion: number;
  fechasolicitud: Date;
  correlativounidad: number;
  objetocontratacion: string;
  cantidadtotal: number;
  idformaadjudic: number;
  idmetodoseleccionadjudic: number;
  idusuarioaprobador?: number;
  idusuariorpa?: number;
  idestadoproceso: number
  idplan: number;
  preciototal: number;
  preciounitariototal: number;

  justificacion: string;
  especificaciones: string;
  plazoentrega: number;
  condicionescomplementarias:string;
  formalizacion: string;
  lugarentrega: string;
  instalacion: string;
  garantia: string;
  plazoentregaliteral: string;
  descripcion: string;

  iddocumentoreferencia?: number;
  numerofojas: number;

  codigopac: number

  razonsocial?: string,
  representantelegal?: string,
  cirepresentantelegal: string,
  nit?: string,
  
  ////////// Personal ////////////
  idnivelsalarial: number
  honorariomensual: number
  numerocasos: number
  observaciones: string
  
  activo: boolean;
  isEdit?: boolean;

  certificacion: any
  requerimientos: RequerimientoPlan;
  itemsProceso?: ItemsProceso[];

  ////////////////////////////////////////
  tipoproceso: TipoProceso;
  tipoprocesoTexto: string;

}


export const SolicitudProcesoColumns = [
  {
    key: 'correlativounidad',
    type: 'text',
    label: 'Cite',
    style: 'width: 2%;',
    required: true,
    disabled: true,
    hidden: false
  },
  {
    key: 'objetocontratacion',
    type: 'text',
    label: 'Objeto',
    style: 'width: 35%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'tipoprocesoTexto',
    type: 'text',
    label: 'Tipo',
    style: 'width: 10%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'cantidadtotal',
    type: 'text',
    label: 'Cantidad',
    style: 'width: 4%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'preciounitariototal',
    type: 'text',
    label: 'Unitario',
    style: 'width: 10%;',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'preciototal',
    type: 'text',
    label: 'Total',
    style: 'width: 10%;',
    required: false,
    disabled: true,
    hidden: false
  },
  {
    key: 'fechasolicitud',
    type: 'date',
    label: 'Fecha de inicio',
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
    style: 'width: 15%;',
    required: false,
    disabled: false,
    hidden: false
  },
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
];

