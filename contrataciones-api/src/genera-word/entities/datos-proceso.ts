export interface DatosProceso {
  fechaliteral?: string;
  cite?: string;
  objeto?: string;
  precionumeral?: string,
  precioliteral?: string,
  partidanumeral?: string;
  partidaliteral?: string;
  solicitante?: string;
  cargosolicitante?: string;
  superior?: string;
  cargosuperior?: string;
  plazonumeral?: string;
  plazoliteral?: string;
  formaadjudicacion?: string;
  metodoseleccion?: string;
  codigopac?: string;

  razonsocial?: string,
  representantelegal?: string,
  cirepresentantelegal?: string,
  nit?: string,

  nivelsalarial?: string,
  honorariomensual?: string,
  numerocasos?: string,
  observaciones?: string,

  items?: Requerimiento[],
  totalLietral?: string,
  totalTotalGeneral?: number

}

export interface Requerimiento {
  numero?: number,
  requerimiento?: string,
  unidad?: string,
  cantidad?: number,
  precioUnitario?: number,
  precioTotal?: number
}