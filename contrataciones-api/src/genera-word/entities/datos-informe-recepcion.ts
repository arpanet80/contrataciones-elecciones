export interface DatosInforRecepcion {
  cite?: string;
  solicitante?: string;
  cargosolicitante?: string;
  responsablerecepcionadmin?: string;
  cargoresponsablerecepcionadmin?: string;
  objeto?: string;
  fechainformeliteral?: string;
  citememounidadsol?: string;
  citememoadmin?: string;
  fechamemosliteral?: string;
  fecharecepcionliteral?: string;
  horarecepcionliteral?: string;
  items: RequerimientoRecep[];
  totalLietral?: string,
  totalTotalGeneral?: number
}

export interface RequerimientoRecep {
  numero?: number,
  requerimiento?: string,
  unidad?: string,
  cantidad?: number,
  precioUnitario?: number,
  precioTotal?: number
}