import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailLeadPage } from './detail-lead.page';

const routes: Routes = [
  {
    path: '',
    component: DetailLeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailLeadPageRoutingModule {}
