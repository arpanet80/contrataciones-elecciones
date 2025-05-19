import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideToastr } from 'ngx-toastr';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApiService } from './core/services/api.service';
import { forkJoin } from 'rxjs';
import { EstadosService } from './core/services/estados.service';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { DatePipe } from '@angular/common';

  // Función de inicialización de datos que usa el ApiService
  /*
  export function initializeApp(apiService: ApiService) {

    const estadosService = inject(EstadosService );

    return () => {
      return forkJoin([
        apiService.getAllPlanes(),
        // apiService.getPlanesById(16),
      ]).subscribe({
        next: ([planes]) => {
        // next: ([planes, plan]) => {

          estadosService.estadoPlanArray.set(planes);
          // estadosService.estadoPlan.set(plan);
        },
        error: (err) => {
          console.error('Error en la inicialización:', err);
        }
      });
    };
  }
    */

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe ,
    ////// Para inicializar info en la app
    // ApiService,
    /*
    {
      provide: APP_INITIALIZER,
      useFactory: (apiService: ApiService) => initializeApp(apiService),
      deps: [ApiService],
      multi: true
    },
    */
    /////////////////////////////////////
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withInterceptors([ 
      errorHandlerInterceptor, 
      tokenInterceptor,
      spinnerInterceptor
    ])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,

    /////// para Toastr ////////////
    provideAnimations(), // required animations providers
    provideToastr(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), // Toastr providers
    ////////////////////////////
  ]
};




/*

  // Función de inicialización que usa el ApiService
  export function initializeApp(apiService: ApiService) {
    //// Estado del usuario //////
    const estadosService = inject(EstadosService );
    const estadoPlan = estadosService.estadoPlan;

    return () => {
      return forkJoin([
        apiService.getAllPlanes(),
        apiService.getPlanesById(16),
      ]).subscribe({
        next: ([planes, usuarios]) => {
          // Actualizar las signals con los datos recibidos
          estadoPlan.set(usuarios);
          // usuariosSignal.set(usuarios);

          // Imprimir en consola para verificar
          // console.log('Planes:', planes);         // Log para la primera llamada
          // console.log('Usuarios:', usuarios);     // Log para la segunda llamada
        },
        error: (err) => {
          console.error('Error en la inicialización:', err);
        }
      });
    };
  }

export const appConfig: ApplicationConfig = {
  providers: [
    ApiService,
        {
          provide: APP_INITIALIZER,
        useFactory: (apiService: ApiService) => initializeApp(apiService),
        deps: [ApiService],
        multi: true
        },

    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withInterceptors([ 
      errorHandlerInterceptor, 
      tokenInterceptor,
      spinnerInterceptor
    ])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,

    /////// para Toastr ////////////
    provideAnimations(), // required animations providers
    provideToastr(), provideAnimationsAsync(), provideAnimationsAsync(), // Toastr providers
    ////////////////////////////
  ]
};

*/