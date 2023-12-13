import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestaLoginPage } from './respuesta-login.page';

const routes: Routes = [
  {
    path: '',
    component: RespuestaLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespuestaLoginPageRoutingModule {}
