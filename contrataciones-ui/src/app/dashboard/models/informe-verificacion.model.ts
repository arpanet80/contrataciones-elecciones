export interface InformeVerifiacion {
    id?: number;
    idsolicitud: number;
    fechainforme: Date;
    razonsocial: string;
    representantelegal: string;
    cedula: string;
    fechaentrega: Date;
    items: string;
    copianit: boolean;
    certificadonit: boolean;
    seprec: boolean;
    copiaci: boolean;
    gestora: string;
    sigep: boolean;
    formulario2b: boolean;
    rupe: boolean;
    ofertatecnica: string;
    cumpledocumentos: boolean;
    cumpleofertaadj: boolean;
    activo: boolean;
}

export const InformeVerifiacionColumns = [
  {
    key: 'idsolicitud',
    type: 'text',
    label: 'Cite',
    style: 'width: 2%;',
    required: true,
    disabled: true,
    hidden: false
  },
  {
    key: 'razonsocial',
    type: 'text',
    label: 'Razon Social',
    style: 'width: 30%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'representantelegal',
    type: 'text',
    label: 'Representante Legal',
    style: 'width: 30%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'fechainforme',
    type: 'date',
    label: 'Fecha',
    style: 'width: 5%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'cumpledocumentos',
    type: 'checkbox',
    label: 'Documentos',
    style: 'width: 10%',
    required: true,
    disabled: false,
    hidden: false
  },
  {
    key: 'cumpleofertaadj',
    type: 'checkbox',
    label: 'Oferta',
    style: 'width: 10%;',
    required: true,
    disabled: false,
    hidden: false
  },
  ///////////////////////////////////////////////
  ///// ESTE VA SI O SI /////////////////////////
  ///////////////////////////////////////////////
  {
    key: 'isEdit',
    type: 'button',
    label: 'Acciones',
    style: 'width: 10%;',
    required: false,
    disabled: false,
    hidden: false
  },
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////
];

