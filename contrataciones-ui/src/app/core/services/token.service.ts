import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginResponse, Usuario } from '../../auth/interfaces/usuario';
import { AuthService, EstadosService, NotificacionService } from './services.index';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelper = inject( JwtHelperService );
  private router = inject( Router );
  private noticiacionService = inject( NotificacionService );
  
  private estadosService = inject(EstadosService );
  estadoUsuario = this.estadosService.estadoUsuario;

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  GetTokenDecoded(token: string | null): any {
    //console.log(this.jwtHelper.decodeToken(localStorage.getItem('token')!))
    return this.jwtHelper.decodeToken(token!);
    //return this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
  }

  
  getIsTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token)
  }
  
  getTokenExpirationDate(token: string) {
    return this.jwtHelper.getTokenExpirationDate(token);
  }

  getTokenIsValid(): boolean {
    
    try {
      var cadena = localStorage.getItem(this.keyToken);
      // console.log(cadena);
      
      if (cadena) {

          var object: LoginResponse = JSON.parse(cadena);

          var expiracion =  this.jwtHelper.getTokenExpirationDate(object.token);
          const fechaActual  = new Date();

          if ( expiracion != null ) {
            if (fechaActual < expiracion) {

              this.estadoUsuario.set(object.userInfo);

              return true;

            }
            else {
              this.removeStorageToken();
              return false;  
            }
          }
          else
            return false;  
      }
      else
        return false;

      } catch (error) {
        console.log(" error comprobacion de token: ",  error);
        this.noticiacionService.showError("Existio un intento de falsificacion", "Error");
        this.removeStorageToken();
        return false;
      }

  }

  //////////////// LOCALSTORAGE ////////////////////////

  keyToken = 'token';

  // Set a value in local storage

  setStorageToken(value: LoginResponse): void {
    localStorage.setItem(this.keyToken, JSON.stringify(value));
  }

  getStorageToken(): LoginResponse | null {

    var key = localStorage.getItem(this.keyToken);

    if (key) {
      var object: LoginResponse = JSON.parse(key);
      return object;
    }
    else
      return null;
  }

  removeStorageToken(): void {
    localStorage.removeItem(this.keyToken);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }

  //////////////////////// USER ///////////////////////////////////////////////

  GetUserByToken(): Usuario {
    return this.jwtHelper.decodeToken(this.getToken()!) as Usuario;
  }


  //////////////////// LAST URL //////////////////////////////////////////
  
  saveLastURL(url: string) {
    localStorage.setItem('ultimaurl', url);
  }

  getLastURL() {
    const key = localStorage.getItem('ultimaurl');
    console.log("====", key);
    if (key) {
      return key;
    }

    return null;
  }

  clearLastURL() {
    localStorage.removeItem('ultimaurl');
  }

  navigateToLastURL() {
    const url = this.getLastURL();
    if ( url ) {
      this.router.navigate([ url ]);
    }
    else
      this.router.navigate([ 'dashboard/home' ]);

  }

}
