import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailServicesPageRoutingModule } from './detail-services-routing.module';

import { DetailServicesPage } from './detail-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailServicesPageRoutingModule
  ],
  declarations: [DetailServicesPage]
})
export class DetailServicesPageModule {}
