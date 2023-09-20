import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewServiceUserPageRoutingModule } from './new-service-user-routing.module';

import { NewServiceUserPage } from './new-service-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewServiceUserPageRoutingModule
  ],
  declarations: [NewServiceUserPage]
})
export class NewServiceUserPageModule {}
