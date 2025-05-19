export interface CombosPoceso {
    tipoproceso: Tipoproceso[]
    formaAdjudic: FormaAdjudic[]
    formaContrat: FormaContrat[]
    metodoSeleccion: MetodoSeleccion[]
    estadoProceso: EstadoProceso[]
    unidadMedida: UnidadMedida[]
    clasificadorPartidas: ClasificadorPartida[]
    documentoReferencia: DocumentoReferencum[]
    nivelSalarial: NivelSalarial[]
  }
  
  export interface Tipoproceso {
    id: number
    nombre: string
    descripcion: string
    activo: boolean
  }
  
  export interface FormaAdjudic {
    id: number
    detalle: string
    activo: boolean
  }
  
  export interface FormaContrat {
    id: number
    detalle: string
    activo: boolean
  }
  
  export interface MetodoSeleccion {
    id: number
    detalle: string
    activo: boolean
  }
  
  export interface EstadoProceso {
    id: number
    descripcion: string
    activo: boolean
  }
  
  export interface UnidadMedida {
    id: number
    descripcion: string
    activo: boolean
  }
  
  export interface ClasificadorPartida {
    id: number
    partida: string
    descripcion: string
  }
  
  export interface DocumentoReferencum {
    id: number
    detalle: string
    activo: boolean
  }

  export interface NivelSalarial {
    id?: number;
    nivelsalarial: string;
    activo: boolean;
}
  