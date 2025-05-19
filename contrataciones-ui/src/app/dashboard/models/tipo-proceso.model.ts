export interface TipoProceso {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

/*
export const PlanColumns = [
    {
      key: 'id',
      type: 'text',
      label: 'Id',
      style: 'width: 20px;',
      required: true,
      disabled: true,
      hidden: false
    },
    {
      key: 'gestion',
      type: 'text',
      label: 'Gestion',
      style: 'width: 100px;',
      required: true,
      disabled: false,
      hidden: false
    },
    {
      key: 'abreviacion',
      type: 'text',
      label: 'Abreviacion',
      style: 'width: 70px;',
      required: true,
      disabled: false,
      hidden: false
    },
    {
      key: 'nombre',
      type: 'title',
      label: 'Nombre',
      style: 'width: 400px;',
      required: true,
      disabled: false,
      hidden: false
    },
    
    {
      key: 'isEdit',
      type: 'button',
      label: 'Acciones',
      style: 'width: 100px;',
      required: false,
      disabled: false,
      hidden: false
    },
  
  ];
  */