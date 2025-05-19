import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/services.index';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject( TokenService);
 
  const tokenJwt = tokenService.getStorageToken()?.token;                       // Recupera el token del localstorage

  if (!tokenJwt) {                                  // Si el token no existe se devuelve la peticion sin modificarlo
    return next(req);
  }

  let clonedRequest =  req.clone( {
    setHeaders: {
      Authorization: `Bearer ${tokenJwt}`
    }
    // headers: req.headers.set('Authorization', `Bearer ${tokenJwt}`),    // inserta el Bearer Jwt en el clon de la peticion
  });

  return next(clonedRequest);
};
