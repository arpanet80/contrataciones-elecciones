import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService, NotificacionService } from '../services/services.index';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  var router = inject( Router );
  var authService = inject( AuthService );
  var noticiacionService = inject( NotificacionService );
  
  return next(req)
  .pipe(
    catchError((error: HttpErrorResponse )  => {

      let errorMessage = "";

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente  o error de red

        errorMessage =  `Error: ${error.error.message}`;
        console.log("Error del cliente!!! => ", errorMessage);

      } else {
        // Error del lado del servidor

        errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
        console.log(errorMessage);
        noticiacionService.showError(errorMessage, "Error" );
        

        /*
        switch (error.status) {

          // ERRORES 4XX ERRORES DE CLIENTE

          case 400:   //Bad Request
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            console.log(errorMessage);
            noticiacionService.showError(errorMessage, "Error" );
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            break;
          case 401:   //Unauthorized
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            authService.logout();
            break;
          case 403:   //Forbidden
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 404:   //Not Found
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 405:   //Method Not Allowed
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 407:   //Proxy Authentication Required
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 408:   //Request Timeout
            errorMessage = `${error.error.message}  </br> Error </br> Codigo de error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 414:   //URI Too Long
            errorMessage = `URI consultada demasiado larga </br> Codigo de error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 429	:   //Too Many Requests
            errorMessage = `Demasiadas solicitudes realizadas </br> Codigo de error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            // router.navigate(['/dashboard']);
            break;

          // ERRORES 5XX ERRORES DE SERVIDOR

          case 500:   //Internal Server Error
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            // router.navigate(['/dashboard']);
            break;
          case 503:   //Service Unavailable
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          case 511:   //Network Authentication Required
            errorMessage = `${error.error.message}  </br> Error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            router.navigate(['/dashboard']);
            break;
          default:
            errorMessage = `Error desconocido en HTTP </br> Codigo de error: ${error.status} (${error.statusText})`;
            noticiacionService.showError(errorMessage, "Error");
            console.log("Mensaje de error devuelto ==> ", error.error.message);
            // router.navigate(['/dashboard']);
            break;
          }
          */
        }
        
        return throwError( () => error );

    })
  );


};
