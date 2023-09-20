import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailServicesPage } from './detail-services.page';

const routes: Routes = [
  {
    path: '',
    component: DetailServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailServicesPageRoutingModule {}
