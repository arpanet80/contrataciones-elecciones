import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { NotificacionService } from './notificacion.service';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LoginResponse, Usuario } from '../../auth/interfaces/usuario';
import { LoginUser } from '../../auth/interfaces/login-user';
import { EstadosService } from './estados.service';
import { Plan } from '../../dashboard/models/plan.model';
import { FuncionarioInfo, Unidadorganizacional } from '../../auth/interfaces/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.apiUsuarios;
  
  private http = inject( HttpClient);
  private router = inject( Router);
  private tokenService = inject( TokenService);
  private noticiacionService = inject( NotificacionService );
  private urlUsuario = `${environment.apiUsuarios}`;


  //// Estado del usuario //////
  private estadosService = inject(EstadosService );
  estadoUsuario = this.estadosService.estadoUsuario;

  verificaArrayRoles(rolesSistema: number[] | undefined, rolesUsuario: number[] | undefined): boolean {
  
    if (rolesSistema?.some( rol => rolesUsuario?.includes(rol) )) {
      return true;
    }
    else
      return false;
  }

  login(usuario: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}auth/login`;
    const credenciales: LoginUser = {
      usuario,
      contrasena,
      idsistema: 3  // ID del sistema
    };
  
    return this.http.post<LoginResponse>(url, credenciales).pipe(
      tap(({ userInfo, token }) => {
        if (token) {
          this.estadoUsuario.set(userInfo);
          this.tokenService.setStorageToken({ userInfo, token });
        }
      }),
      switchMap((response) => of(response)), // Evita el map innecesario
      catchError((error: HttpErrorResponse) => {
        // const errorMessage = error.status === 400
        //   ? `Credenciales incorrectas. Error: ${error.status} (${error.statusText})`
        //   : `Error en el servidor. Código: ${error.status} (${error.statusText})`;
  
        // this.noticiacionService.showError(errorMessage, "Error");
        return throwError(() => error);
      })
    );
  }
  
  isAuthenticated(): boolean {
    if (!this.tokenService.getTokenIsValid()) {
        return false;
    }

    // Verificar plan activo
    // if (!this.verificarPlanActivo()) {
    //     this.noticiacionService.showInfo("No se seleccionó ningún plan activo. </br> Debe seleccionar uno", "Info");
    //     this.router.navigate(['/dashboard/home']);
    //     return false;
    // }

    // Verificar información del funcionario
    if (!this.verificarFuncionario()) {
        this.noticiacionService.showInfo("No se pudo obtener la información del Funcionario", "Info");
        this.logout();
        return false;
    }

    return true;
}

/**
 * Verifica si hay un plan activo en localStorage y lo guarda en estadosService.
 */
// private verificarPlanActivo(): boolean {
//     try {
//         const planData = localStorage.getItem('planActivo');
//         if (planData) {
//             const plan: Plan = JSON.parse(planData);
//             this.estadosService.planSeleccionado.set(plan);
//             return true;
//         }
//     } catch (error) {
//         console.error("Error comprobando plan activo:", error);
//         this.noticiacionService.showError("Hubo un error al leer las opciones de la App", "Error");
//     }
//     return false;
// }

/**
 * Verifica si hay información del funcionario en localStorage y la guarda en estadosService.
 */
private verificarFuncionario(): boolean {
    try {
        const funcionarioData = localStorage.getItem('funcionarioInfo');
        if (funcionarioData) {
            const funcionario: FuncionarioInfo = JSON.parse(funcionarioData);
            this.estadosService.estadoFuncionario.set(funcionario);
            return true;
        }
    } catch (error) {
        console.error("Error comprobando información del usuario:", error);
        this.noticiacionService.showError("Hubo un error al leer las opciones de la App", "Error");
    }
    return false;
}

  /*
  isAuthenticated(): boolean {


    if (this.tokenService.getTokenIsValid()) {

      /////////////////////////////////////////////////////////////
      /////// Aqui lee si existe plan seleccioonado ////////////////
      /////////////////////////////////////////////////////////////

      try {
        var cadena = localStorage.getItem('planActivo');

        if (cadena) {
  
            var object: Plan = JSON.parse(cadena);
            this.estadosService.planSeleccionado.set(object);

        }
        else {
          this.noticiacionService.showInfo("No se selecciono ningun plan activo. </br> Debe seleccionar uno", "Info");
          this.router.navigate(['/selectplan'])
        }
  
      } catch (error) {
        console.log(" Error comprobacion de plan activo: ",  error);
        this.noticiacionService.showError("Existio un error al leer opciones de la App", "Error");
        return false;
      }

      /////////////////////////////////////////////////////////////
      /////// Aqui lee si existe Funcionario por id ////////////////
      /////////////////////////////////////////////////////////////
      
      try {
        var cadena2 = localStorage.getItem('funcionarioInfo');

        if (cadena2) {
  
            var object2: FuncionarioInfo = JSON.parse(cadena2);

            this.estadosService.estadoFuncionario.set(object2);

        }
        else {
          this.noticiacionService.showInfo("No se Pudo obtener la informacion del Funcionario", "Info");
          // this.router.navigate(['/selectplan'])
          this.logout();
        }
  
      } catch (error) {
        console.log(" error comprobacion de informacion del usuario: ",  error);
        this.noticiacionService.showError("Existio un error al leer opciones de la App", "Error");
        return false;
      }

      return true;
    }
    else
      return false



    // this.tokenService.getTokenIsValid();
    // var value = this.tokenService.getStorageToken();
     // if (value != null || value != undefined) {
    //   this.estadoUsuario.set(value.userInfo);
    //   return true;
    // }
    // else {
    //   return false
    // }

  }
*/

  logout() {

    this.tokenService.removeStorageToken();
    localStorage.removeItem('planActivo');
    localStorage.removeItem('funcionarioInfo');

    // Limpia las señales
    this.estadoUsuario.set(null);
    this.estadosService.planSeleccionado.set(null);
    this.estadosService.estadoFuncionario.set(null);

    // this.router.navigate(['/login']); 
    window.location.href = '/login';

  }

  
  /////////////////////////////////////////////////////////////////////////////////
  //////////////////          USUARIO       /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  
  getFuncionarioById(id: number): Observable<FuncionarioInfo> {
    return this.http.get(`${this.urlUsuario}funcionarios/${id}`)
    .pipe<FuncionarioInfo>(map((data: any) => data));
  }

  getUnidadOrganizacionalById(id: number): Observable<Unidadorganizacional> {
    return this.http.get(`${this.urlUsuario}unidadorganizacional/${id}`)
      .pipe<Unidadorganizacional>(map((data: any) => data));
  }

}
