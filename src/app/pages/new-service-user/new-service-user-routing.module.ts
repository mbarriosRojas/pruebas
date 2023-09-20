import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewServiceUserPage } from './new-service-user.page';

const routes: Routes = [
  {
    path: '',
    component: NewServiceUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewServiceUserPageRoutingModule {}
