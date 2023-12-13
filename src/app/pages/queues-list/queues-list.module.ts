import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueuesListPageRoutingModule } from './queues-list-routing.module';

import { QueuesListPage } from './queues-list.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueuesListPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [QueuesListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QueuesListPageModule {}
