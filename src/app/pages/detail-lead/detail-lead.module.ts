import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailLeadPageRoutingModule } from './detail-lead-routing.module';

import { DetailLeadPage } from './detail-lead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailLeadPageRoutingModule
  ],
  declarations: [DetailLeadPage]
})
export class DetailLeadPageModule {}
