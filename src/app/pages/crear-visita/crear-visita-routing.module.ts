import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearVisitaPage } from './crear-visita.page';

const routes: Routes = [
  {
    path: '',
    component: CrearVisitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearVisitaPageRoutingModule {}
