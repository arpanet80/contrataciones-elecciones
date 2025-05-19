import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { notLoguedGuard } from './core/guards/not-logued.guard';
import { loguedGuard } from './core/guards/logued.guard';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProcesosListComponent } from './dashboard/pages/procesos/procesos-list/procesos-list.component';
import { ProcesosNuevoComponent } from './dashboard/pages/procesos/procesos-nuevo/procesos-nuevo.component';
import { ProcesosCotizacionComponent } from './dashboard/pages/procesos/procesos-cotizacion/procesos-cotizacion.component';
import { SaldosPlanComponent } from './dashboard/pages/plan/saldos-plan/saldos-plan.component';
import { VerPlanComponent } from './dashboard/pages/plan/ver-plan/ver-plan.component';
import { ConfigPlanOperativoComponent } from './dashboard/pages/configuracion/config-plan-operativo/config-plan-operativo.component';
import { ImportarPlanOperativoComponent } from './dashboard/pages/configuracion/importar-plan-operativo/importar-plan-operativo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        canActivate: [ notLoguedGuard ],
        component: LoginComponent,
        // loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent),          // Lazy loading
      },
      {
        path: 'dashboard',
        canActivate: [ loguedGuard ],
        component: LayoutComponent,
        // loadComponent: () => import('./dashboard/layout/layout/layout.component').then(m => m.LayoutComponent), 
        children: [
            { path: 'home', component: HomeComponent },

            ////////////////////////////////////////////////////////////////////////////////
            ////// TOMAR EN CUENTA LAS SUBRUTAS PARA EL FUNCIONAMIENTO DEL MENU ////////////
            ////////////////////////////////////////////////////////////////////////////////

            /////// PROCESOS DE CONTRATACION ////////////////

            { path: 'procesos/lista', component: ProcesosListComponent , data: { titulo: 'Listado de procesos de contratacion', subtitulo: 'Procesos de contratacion en proceso y finalizados', rutaBreadcrumbs:'Lista procesos'} ,},
            { path: 'procesos/nuevo', component: ProcesosNuevoComponent , data: { titulo: 'Nuevo Proceso de contrtacion', subtitulo: 'Registro de nuevo proceso', rutaBreadcrumbs:'Nuevo proceso'} ,},
            { path: 'procesos/cotizacion', component: ProcesosCotizacionComponent , data: { titulo: 'Cotizaciones', subtitulo: 'Lista de cotizaciones realizadas', rutaBreadcrumbs:'Cotizacion'} ,},


            /////// PLAN OPERATIVO ////////////////

            { path: 'plan/ver', component: VerPlanComponent , data: { titulo: 'Ver plan operativo', subtitulo: 'Listado de los requerimientos del Plan Operativo', rutaBreadcrumbs:'Ver plan'} ,},
            { path: 'plan/saldos', component: SaldosPlanComponent , data: { titulo: 'Saldos del plan operativo', subtitulo: 'Consulta de saldos disponibles y ejecución', rutaBreadcrumbs:'Saldos'} ,},
            

            /////// CONFIGURACION ////////////////

            { path: 'config/importarplan', component: ImportarPlanOperativoComponent , data: { titulo: 'Importar plan operativo', subtitulo: 'Importar el plan operativo actual', rutaBreadcrumbs:'Importar plan'} ,},
            { path: 'config/planoperativo', component: ConfigPlanOperativoComponent , data: { titulo: 'Configurar plan operativo', subtitulo: 'Configuracion de parametros del plan operativo', rutaBreadcrumbs:'Configurar plan'} ,},
            
            
        ]
      },

];
