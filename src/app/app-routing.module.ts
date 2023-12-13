import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './guards/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'respuestaLogin',
    loadChildren: () => import('./pages/respuesta-login/respuesta-login.module').then( m => m.RespuestaLoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'detail-lead',
    loadChildren: () => import('./pages/detail-lead/detail-lead.module').then( m => m.DetailLeadPageModule)
  },
  {
    path: 'detail-lead/:leadId',
    loadChildren: () => import('./pages/detail-lead/detail-lead.module').then( m => m.DetailLeadPageModule)
  },
  {
    path: 'crear-visita/:leadId',
    loadChildren: () => import('./pages/crear-visita/crear-visita.module').then( m => m.CrearVisitaPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'detail-event/:eventId',
    loadChildren: () => import('./pages/detail-event/detail-event.module').then( m => m.DetailEventPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./pages/create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'create-lead/:createEvent',
    loadChildren: () => import('./pages/create-lead/create-lead.module').then( m => m.CreateLeadPageModule)
  },
  {
    path: 'create-lead',
    loadChildren: () => import('./pages/create-lead/create-lead.module').then( m => m.CreateLeadPageModule)
  },  {
    path: 'queues-list',
    loadChildren: () => import('./pages/queues-list/queues-list.module').then( m => m.QueuesListPageModule)
  }







];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
