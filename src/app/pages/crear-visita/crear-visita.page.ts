import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Evento } from 'src/app/models/evento';
import { optionSelect } from 'src/app/models/prospecto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-visita',
  templateUrl: './crear-visita.page.html',
  styleUrls: ['./crear-visita.page.scss'],
})
export class CrearVisitaPage implements OnInit {
  tokenSF: any = '';
  tokenRF: any = '';
  instancia: any = '';

  idLead: any = '';
  loading: any;

  optsTipo: optionSelect[] = [];
  optsEstado: optionSelect[] = [];

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
      if (!paramMap.has('leadId')) {
        this.router.navigate(['/']);
      }
      this.idLead = paramMap.get('leadId');
      console.log(this.idLead);
      this.datosEvento.WhoId = this.idLead;
      this.getvaloresPicklist();
    });
    this.datosEvento.StartDateTime = (new Date()).toISOString();
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
        this.loading.dismiss();
      })
      .catch(() => {
        this.loading.dismiss();
        console.log('error');
      });
  }

  guardar() {
    this.showLoading();
    console.log(this.datosEvento);
    
    let query ="/services/data/v56.0/sobjects/Event";
    console.log(query);
    let dataEnviar = this.datosEvento;
    var auxHora = dataEnviar.StartDateTime;
    dataEnviar.StartDateTime = dataEnviar.StartDateTime+'-03:00';
    dataEnviar.WhoId = this.datosEvento.WhoId;
    dataEnviar.DurationInMinutes = this.datosEvento.DurationInMinutes;
    console.log(dataEnviar);
    this.authService
      .executeQueryPost(this.instancia + query, this.tokenSF, dataEnviar)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        dataEnviar.StartDateTime = auxHora;
        if (resp.success){
          this.presentToast('top','Se modifico con exito',5000,'success')
        } else {
          this.presentToast('top','Error:'+resp.errors[0].message,5000,'danger')
        }
        this.loading.dismiss();
        setTimeout(() => {
          this.navCtrl.navigateForward('/calendario');
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
