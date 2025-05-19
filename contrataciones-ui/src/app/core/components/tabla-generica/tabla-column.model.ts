export interface TableColumnSchema {
    key: string,
    type: string,
    keysubnivel?: string,
    label: string,
    style: string,
    required: boolean,
    disabled: boolean
    hidden: boolean
}

export interface DataFiltro {
    tituloKey: string,
    key: string,
    conboFiltro: ComboFiltro[]
}

export interface ComboFiltro {
    id: number,
    titulo: string
}

export interface TablaOpciones {
    
    btnNuevo?: boolean,
    btnEliminar?: boolean,
    btnEditarEnTabla?: boolean,
    btnCustom?: OpcionCustom,
    btnCustom1?: OpcionCustom,
    btnCustom2?: OpcionCustom,
    btnCustom3?: OpcionCustom,

    filtro?: boolean,
    dataFiltro?: DataFiltro
}

export interface OpcionCustom {
    
    icono: string,
    colorClass: string,
    tooltip: string,
}

