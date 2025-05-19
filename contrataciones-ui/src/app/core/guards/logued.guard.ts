import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService, EstadosService } from '../services/services.index';

export const loguedGuard: CanActivateFn = (route, state) => {

  const router      = inject( Router );
  const authService = inject( AuthService );
  
  ///// si no esta autenticado no deja entrar al dashboard /////////
  if ( authService.isAuthenticated() ) {

    // if (tokenService.getLastURL()) {
    //   tokenService.navigateToLastURL;
    // }
    // else
    //   router.navigateByUrl('/');
    
    // console.log("Guard auth dejo entrar ");
    return true;
  }
  else {
      console.log("Guard Auth bloqueo ");
      router.navigateByUrl('/login');
      return false;
  }


  
};
