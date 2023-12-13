import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearVisitaPageRoutingModule } from './crear-visita-routing.module';

import { CrearVisitaPage } from './crear-visita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearVisitaPageRoutingModule
  ],
  declarations: [CrearVisitaPage]
})
export class CrearVisitaPageModule {}
