export interface CertificadoPresupuestario {
  // map(arg0: (certificacion: any) => any): unknown;
  id: number;
  idsolproceso: number;
  numeropreventivo: number;
  fechaemision: Date;
  partida: string;
  importe: number;
  activo?: boolean
}

