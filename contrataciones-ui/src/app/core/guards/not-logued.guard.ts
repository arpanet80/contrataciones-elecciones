import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/services.index';

export const notLoguedGuard: CanActivateFn = (route, state) => {

  const router      = inject( Router );
  const authService = inject( AuthService );
  
  ///// si no esta autenticado no deja entrar al dashboard /////////
  if ( !authService.isAuthenticated() ) {

    // if (tokenService.getLastURL()) {
    //   tokenService.navigateToLastURL;
    // }
    // else
    //   router.navigateByUrl('/');
    
    // console.log("Guard not logued dejo entrar ");
    return true;
  }
  else {
      console.log("Guard not logued bloqueo oooo ");
      router.navigateByUrl('/dashboard/home');
      return false;
  }


  
};
