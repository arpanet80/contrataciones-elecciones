export interface DatosInformeVerificacion {
  cite?: string;
  objeto?: string;
  solicitante?: string;
  cargosolicitante?: string;
  fechaliteral?: string;
  razonsocial?: string;
  representantelegal: string;
  fechaentrega: string;
  items: Item[];
  cedula: string;

  copianitCumple: string;
  certificadonitCumple: string;
  seprecCumple: string;
  copiaciCumple: string;
  gestoraCumple: string;
  sigepCumple: string;
  formulario2bCumple: string;
  rupeCumple: string;

  copianitNoCumple: string;
  certificadonitNoCumple: string;
  seprecNoCumple: string;
  copiaciNoCumple: string;
  gestoraNoCumple: string;
  sigepNoCumple: string;
  formulario2bNoCumple: string;
  rupeNoCumple: string;
  
  detallecumplimientoofertatecnica: string;
  detallecumplimientoofertatecnicaEXTRA: string;

  cumpledocumentos: string;
  cumpleoferta: string;
  cumpledocumentosX: string;
  noCumpledocumentosX: string;
  cumpleofertaX: string;
  noCumpleofertaX: string;

  recomendaciones: Recomendacion[];

}

export interface Recomendacion  {
  detalle: string;
}

export interface Item  {
  detalle: string;
}