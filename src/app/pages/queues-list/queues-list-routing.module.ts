import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueuesListPage } from './queues-list.page';

const routes: Routes = [
  {
    path: '',
    component: QueuesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueuesListPageRoutingModule {}
