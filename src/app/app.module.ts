import { NgModule,LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule ,
    NgxDatatableModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
