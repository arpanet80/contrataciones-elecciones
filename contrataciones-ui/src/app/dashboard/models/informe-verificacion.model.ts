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
