import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Plan } from '../../dashboard/models/plan.model';
import { Rpa } from '../../dashboard/models/rpa.model';
import { Funcionario } from '../../dashboard/models/funcionario.model';
import { RequerimientoPlan } from '../../dashboard/models/requerimiento-plan.model';
import { SolicitudProceso } from '../../dashboard/models/solicitud-proceso.model';
import { TipoProceso } from '../../dashboard/models/tipo-proceso.model';
import { ClasificadorPartida, CombosPoceso } from '../../dashboard/models/combos-proceso.model';
import { CertificadoPresupuestario } from '../../dashboard/models/certificado-presupuestario.model';
import { DocumentoData } from '../../dashboard/models/documento-data.model';
import { RequerimientoProceso } from '../../dashboard/models/requerimiento-proceso';
import { InformeVerifiacion } from '../../dashboard/models/informe-verificacion.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
   
  private http = inject( HttpClient );
  private url = `${environment.apiUrl}`;

  constructor() {   }

  /////////////////////////////////////////////////////////////////////////////////
  //////////////////          PLAN       /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  
  getAllPlanes(): Observable<Plan[]> {
    return this.http.get(`${this.url}planes`)
    .pipe<Plan[]>(map((data: any) => data));
  }

  getPlanesById(id: number): Observable<Plan> {
    return this.http.get(`${this.url}planes/${id}`)
    .pipe<Plan>(map((data: any) => data));
  }
  
  addPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.url}planes/`, plan);
  }

  updatePlan(id: number, plan: Plan): Observable<Plan> {
    return this.http.patch<Plan>(`${this.url}planes/${id}`, plan);
  }

  deletePlan(id: number): Observable<Plan> {
    return this.http.delete<Plan>(`${this.url}planes/${id}`);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //////////////////          RPA        /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  
  getRpaActivo(): Observable<Rpa> {
    return this.http.get(`${this.url}rpa/activo`)
    .pipe<Rpa>(map((data: any) => data));
  }

  addRpa(rpa: Rpa): Observable<Rpa> {
    return this.http.post<Rpa>(`${this.url}rpa/`, rpa);
  }

  deshabilitaEInserta(idusuario: number): Observable<Rpa> {
    return this.http.get(`${this.url}rpa/deshanilitaeinserta/${idusuario}`)
    .pipe<Rpa>(map((data: any) => data));

  }

  deleteRpa(id: number) {
    return this.http.delete(`${this.url}rpa/${id}`);
  }



  /////////////////////////////////////////////////////////////////////////////////
  //////////////////   FUNCIONARIOSV     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getAllFuncionarios(): Observable<Funcionario[]> {
    return this.http.get(`${this.url}funcionarios`)
    .pipe<Funcionario[]>(map((data: any) => data));
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get(`${this.url}funcionarios/${id}`)
    .pipe<Funcionario>(map((data: any) => data));
  }


  
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////   REQUERIMIENTOS PLAN     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getRequerimientosPlanUnidadOrganiz(idplan: number | undefined, idunidadorganizacional: number | undefined): Observable<RequerimientoPlan[]> {

    return this.http.get(`${this.url}requerimientoplan/${idplan}/${idunidadorganizacional}`)
    .pipe(
      map((data: any) => data),
      catchError(error => {
        if (error.status === 404) {
          // console.log("<<<Error>>>:", error);
          // Manejamos el error 404 de manera específica
          return throwError('SinRegistros');
        }
        // Otros errores se lanzan normalmente
        return throwError(error);
      })
    );
/*
    return this.http.get(`${this.url}requerimientoplan/${idplan}/${idunidadorganizacional}`)
    .pipe(
      map((data: any) => data),
      catchError(error => {
        if (error.status === 404) {
          // Aquí manejas el error 404 de manera específica
          return throwError('NoPadron');
        }
        // Puedes manejar otros errores aquí o re-lanzarlos
        return throwError(error);
      })
    ); */
  }

  getAllRequerimientos(): Observable<RequerimientoPlan[]> {
    return this.http.get(`${this.url}requerimientoplan`)
    .pipe<RequerimientoPlan[]>(map((data: any) => data));
  }

  getRequerimientosById(id: number): Observable<RequerimientoPlan> {
    return this.http.get(`${this.url}requerimientoplan/${id}`)
    .pipe<RequerimientoPlan>(map((data: any) => data));
  }
  
  addRequerimiento(plan: RequerimientoPlan): Observable<RequerimientoPlan> {
    return this.http.post<RequerimientoPlan>(`${this.url}requerimientoplan/`, plan);
  }

  addRequerimientosArray(plan: RequerimientoPlan[]): Observable<RequerimientoPlan[]> {
    return this.http.post<RequerimientoPlan[]>(`${this.url}requerimientoplan/array`, plan);
  }

  updateRequerimiento(id: number, plan: RequerimientoPlan): Observable<RequerimientoPlan> {
    return this.http.patch<RequerimientoPlan>(`${this.url}requerimientoplan/${id}`, plan);
  }

  deleteRequerimiento(id: number): Observable<any> {
    return this.http.delete<RequerimientoPlan>(`${this.url}requerimientoplan/${id}`);
  }

  deleteRequerimientoArray(ids: number[]): Observable<any> {
    return this.http.post(`${this.url}requerimientoplan/eliminaarray`, ids);
  }

  deleteByPlanUO(idplan: number | undefined, idunidadorganizacional: number | undefined): Observable<any> {
    return this.http.delete<RequerimientoPlan>(`${this.url}requerimientoplan/eliminabyplan/${idplan}/${idunidadorganizacional}`);
  }

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////   INFORME VERIFICACION     /////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getAllInformeVerificacion(): Observable<InformeVerifiacion[]> {
    return this.http.get(`${this.url}informeverificacion`)
    .pipe<InformeVerifiacion[]>(map((data: any) => data));
  }

  addInformeVerificacion(informe: InformeVerifiacion): Observable<InformeVerifiacion> {
    return this.http.post<InformeVerifiacion>(`${this.url}informeverificacion/`, informe);
  }

  updateInformeVerificacion(id: number, informe: InformeVerifiacion): Observable<InformeVerifiacion> {
    return this.http.patch<InformeVerifiacion>(`${this.url}informeverificacion/${id}`, informe);
  }

  deleteInformeVerificacion(id: number): Observable<any> {
    return this.http.delete<InformeVerifiacion>(`${this.url}informeverificacion/${id}`);
  }


  ////////////////////////////////////////////////////////////////////////////////
  //////////////////   SOLICITUD DE PROCESOS     /////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getCombosSolProceso() : Observable<CombosPoceso> {
    return this.http.get(`${this.url}solproceso/getcombos`)
    .pipe<CombosPoceso>(map((data: any) => data));
  }

  getAllSolicitudProceso(): Observable<SolicitudProceso[]> {
    return this.http.get(`${this.url}solproceso`)
    .pipe<SolicitudProceso[]>(map((data: any) => data));
  }

  getSolicitudProcesoByIdplanIdunodadorganizacional(idplan: number, idunidadorganizacional): Observable<SolicitudProceso[]> {
    return this.http.get(`${this.url}solproceso/${idplan}/${idunidadorganizacional}`)
    .pipe<SolicitudProceso[]>(map((data: any) => data));
  }

  getSolicitudById(id: number): Observable<SolicitudProceso> {
    return this.http.get(`${this.url}solproceso/${id}`)
    .pipe<SolicitudProceso>(map((data: any) => data));
  }
  
  addSolicitudProceso(solicitud: SolicitudProceso): Observable<SolicitudProceso> {
    return this.http.post<SolicitudProceso>(`${this.url}solproceso/`, solicitud);
  }

  addSolicitudProcesoArray(solicitud: SolicitudProceso[]): Observable<SolicitudProceso[]> {
    return this.http.post<SolicitudProceso[]>(`${this.url}solproceso/array`, solicitud);
  }

  updateSolicitudProceso(id: number, solicitud: SolicitudProceso): Observable<SolicitudProceso> {
    return this.http.patch<SolicitudProceso>(`${this.url}solproceso/${id}`, solicitud);
  }

  deleteSolicitudProceso(id: number): Observable<any> {
    return this.http.delete<SolicitudProceso>(`${this.url}solproceso/${id}`);
  }

  /////////////////////////////////////////////////////////////////////////////////
  //////////////////   TIPO PROCESO     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getAllTipoProceso(): Observable<TipoProceso[]> {
    return this.http.get(`${this.url}tipoproceso`)
    .pipe<TipoProceso[]>(map((data: any) => data));
  }

  getTipoProcesoById(id: number): Observable<TipoProceso> {
    return this.http.get(`${this.url}tipoproceso/${id}`)
    .pipe<TipoProceso>(map((data: any) => data));
  }


  /////////////////////////////////////////////////////////////////////////////////
  //////////////////   CLASIFICADOR     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getClasificadorByPartida(partida: string): Observable<ClasificadorPartida> {
    return this.http.get(`${this.url}clasificador/${partida}`)
    .pipe<ClasificadorPartida>(map((data: any) => data));
  }


  
  /////////////////////////////////////////////////////////////////////////////////
  //////////////////   CERTIFICACION     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  getCertificadoPresupuestarioBySProceso(idsolproceso: number): Observable<CertificadoPresupuestario[]> {
    return this.http.get(`${this.url}certificado-presupuestario/byproceso/${idsolproceso}`)
    .pipe<CertificadoPresupuestario[]>(map((data: any) => data));
  }

   /////////////////////////////////////////////////////////////////////////////////
  //////////////////   REQUERIMIENTO PROCESO     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////


getRequerimientosProcesoByIdSolicitud(id: number): Observable<RequerimientoProceso> {
    return this.http.get(`${this.url}requerimiento-proceso/${id}`)
    .pipe<RequerimientoProceso>(map((data: any) => data));
  }


  
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////   DESCARGA WORD     /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  /**
   * Genera un documento Word y lo descarga
   * @param data Datos para generar el documento
   * @returns Observable con respuesta en formato Blob para manejar la descarga
   */
  generaWord(data: DocumentoData): Observable<Blob> {

    // Configurar los headers necesarios
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    // La opción responseType es clave - indica que esperamos un blob
    return this.http.post(`${this.url}genera-word/descargar-docx`, data, {
      headers: headers,
      responseType: 'blob' // Importante para recibir el archivo como un blob
    });
  }

  generaProceso(idSol: number): Observable<Blob> {

    const body = { idSol }; // ⬅️ Esto genera el objeto { idSol: 1 }
    
    // Configurar los headers necesarios
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    // La opción responseType es clave - indica que esperamos un blob
    return this.http.post(`${this.url}genera-word/proceso-adquisicion`, body, {
      headers: headers,
      responseType: 'blob' // Importante para recibir el archivo como un blob
    });
  }

  generaInformeVerificacion(id: number): Observable<Blob> {

    const body = { id }; // ⬅️ Esto genera el objeto { idSol: 1 }
    
    // Configurar los headers necesarios
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    // La opción responseType es clave - indica que esperamos un blob
    return this.http.post(`${this.url}genera-word/informe-verificacion`, body, {
      headers: headers,
      responseType: 'blob' // Importante para recibir el archivo como un blob
    });
  }
  
}
