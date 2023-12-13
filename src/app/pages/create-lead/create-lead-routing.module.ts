import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateLeadPage } from './create-lead.page';

const routes: Routes = [
  {
    path: '',
    component: CreateLeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateLeadPageRoutingModule {}
