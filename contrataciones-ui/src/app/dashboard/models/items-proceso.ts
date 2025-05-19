export class ItemsProceso {
  constructor(
    public isSelected: boolean,
    public idrequerimientoplan: number,
    public unidad: string,
    public cantidad: number,
    public partida: number,
    public preciounitario: number,
    public total: number,
    public requerimiento: string ,
    public isEdit: boolean,
    public idunidadmedida?: number,
    public idproveedor?: number,
    public originalData?: ItemsProceso
  ){}
}

export const ItemsProcesoColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
    hidden: true,
    style: "width: 1px;"
  },
  {
    key: 'requerimiento',
    type: 'text',
    label: 'Requerimiento',
    disabled: false,
    required: true,
    style: "width: 40%;"
  },
  {
    key: 'cantidad',
    type: 'number',
    label: 'Canti.',
    disabled: false,
    required: true,
    style: "width: 3%;"
  },
  {
    key: 'preciounitario',
    type: 'number',
    label: 'Unitario',
    disabled: false,
    required: true,
    style: "width: 8%;"
  },
  {
    key: 'total',
    type: 'number',
    label: 'Total',
    disabled: true,
    required: true,
    style: "width: 8%;"
  },
  {
    key: 'unidad',
    type: 'selectUnidadMedida',
    label: 'IdUnidad',
    disabled: false,
    required: true,
    style: "width: 15%;"
  },
  {
    key: 'partida',
    type: 'selectPartida',
    label: 'Partida',
    disabled: false,
    required: false,
    style: "width: 10%;"
  },
  {
    key: 'isEdit',
    type: 'button',
    label: 'Acciones',
    style: "width: 15%;"
  },
];
