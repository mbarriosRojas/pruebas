import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Evento } from 'src/app/models/evento';
import { optionSelect } from 'src/app/models/prospecto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {
  datosCargados:Boolean=false;
  tokenSF: any = '';
  tokenRF: any = '';
  instancia: any = '';

  idEvent: any = '';
  loading: any;

  optsTipo: optionSelect[] = [];
  optsEstado: optionSelect[] = [];
  datosCita:any = {};
  datosEvento: Evento = {
    Subject: '',
    StartDateTime: '',
    WhoId: '',
    Type: '',
    Estado_de_la_Entrevista__c:'Programada',
    DurationInMinutes:30,
    Location:'',
    Link_Reunion__c:'',
    Description:''
  };

  constructor(private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController) { 
      this.loading = this.loadingCtrl.create({
        message: 'Cargando',
      });
    }

  ngOnInit() {
    this.showLoading();
    this.tokenSF = localStorage.getItem('tokenSF');
    this.tokenRF = localStorage.getItem('tokenRefreshSF');
    this.instancia = localStorage.getItem('instanciaUrlSF');
    console.log(this.instancia, this.tokenSF);

    let self = this;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('eventId')) {
        this.router.navigate(['/']);
      }
      this.idEvent = paramMap.get('eventId');
      console.log(this.idEvent);
      //this.datosEvento.WhoId = this.idLead;
      this.getvaloresPicklist();
    });
    //this.datosEvento.StartDateTime = (new Date()).toISOString();
  }

  volver() {
    this.navCtrl.back();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando..',
    });

    this.loading.present();
  }

  getvaloresPicklist() {
    let query =
      '/services/data/v56.0/ui-api/object-info/Event/picklist-values/012000000000000AAA/Type';
    console.log(query);

    this.authService
      .executeQuery(this.instancia + query, this.tokenSF)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        //llenar optProductos
        this.optsTipo = [];
        resp.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsTipo.push(opt);
          }
        );
        this.getvaloresPicklistEstados();
      })
      .catch(() => {
        this.loading.dismiss();
        console.log('error');
      });
  }

  getvaloresPicklistEstados() {
    let query =
      '/services/data/v56.0/ui-api/object-info/Event/picklist-values/012000000000000AAA/Estado_de_la_Entrevista__c';
    console.log(query);

    this.authService
      .executeQuery(this.instancia + query, this.tokenSF)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        //llenar optProductos
        this.optsEstado = [];
        resp.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsEstado.push(opt);
          }
        );
        this.obtenerEvento();
        
      })
      .catch(() => {
        this.loading.dismiss();
        console.log('error');
      });
  }

  obtenerEvento(){
    console.log(this.idEvent);
    let query =
        "/services/data/v56.0/query/?q=SELECT+Id,+Description,+OwnerId,+DurationInMinutes,+Owner.Name,+Subject,+IsAllDayEvent,+Estado_de_la_Entrevista__c,+ActivityDate,+EndDateTime,+ActivityDateTime,+StartDateTime,+WhoId,+who.Name,+Type,+Location,+Link_Reunion__c+FROM+Event+WHERE+Id=+'" +this.idEvent+"'";
      this.authService
        .executeQuery(this.instancia + query, this.tokenSF)
        .toPromise()
        .then((resp: any) => {
          console.log(resp);
          this.datosCita = resp.records[0];
          var inicioPicado = resp.records[0].StartDateTime.split('.');

          var auxIni = new Date(resp.records[0].StartDateTime);
          auxIni.setHours(auxIni.getHours() - 3);
          console.log(auxIni.toString());
          console.log(auxIni.toISOString());
          
          this.datosEvento = {
            Subject: resp.records[0].Subject,
            StartDateTime: auxIni.toISOString(),
            WhoId: resp.records[0].WhoId,
            Type: resp.records[0].Type,
            Estado_de_la_Entrevista__c:resp.records[0].Estado_de_la_Entrevista__c,
            DurationInMinutes:resp.records[0].DurationInMinutes,
            Location:resp.records[0].Location,
            Link_Reunion__c:resp.records[0].Link_Reunion__c,
            Description:resp.records[0].Description
          };
          this.datosCargados = true;
          this.loading.dismiss();
        })
        .catch((e) => {
          console.log('error'+e);
          this.loading.dismiss();
        });
    
  }

  guardar() {
    this.showLoading();
    console.log(this.datosEvento);
    
    let query =this.datosCita.attributes?.url;
    console.log(query);
    let dataEnviar = this.datosEvento;
    var auxHora = dataEnviar.StartDateTime;
    var picarFecha = dataEnviar.StartDateTime.split('.');
    dataEnviar.StartDateTime = picarFecha[0]+'-03:00';
    dataEnviar.WhoId = this.datosEvento.WhoId;
    dataEnviar.DurationInMinutes = this.datosEvento.DurationInMinutes;
    console.log(dataEnviar);
    this.authService
      .executeQueryPatch(this.instancia + query, this.tokenSF, dataEnviar)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        dataEnviar.StartDateTime = auxHora;
        this.loading.dismiss();
        this.presentToast('top','Se modifico con exito',5000,'success')
        setTimeout(() => {
          this.navCtrl.navigateRoot('/');
         }, 5000);
      },
        msg => { // Error
        console.log(msg);
        this.loading.dismiss();
        this.presentToast('top','Error:'+msg.error[0].message,5000,'danger')
      })
      .catch(() => {
        this.loading.dismiss();
        console.log('error');
        
      });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', mensaje:string,duration:number,tipo:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      position: position,
      color:tipo
    });

    await toast.present();
  }

}
