export interface RequerimientoProceso {
  id?: number;
  idsolproceso: number;
  idrequerimientoplan: number;
  idunidadmedida: number;
  cantidad: number;
  idproveedor?: number;
  partida: number;
  activo?: boolean;
  preciounitario: number;
  preciototal: number;
  requerimiento: string;
}

