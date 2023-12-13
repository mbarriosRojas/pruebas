import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-respuesta-login',
  templateUrl: './respuesta-login.page.html',
  styleUrls: ['./respuesta-login.page.scss'],
})
export class RespuestaLoginPage implements OnInit {
  respuesta:string='';
  loading: any;
  constructor(public alertController: AlertController,
    private authService: AuthService,
    public loadingController: LoadingController,
    public route: Router,
    public toastController: ToastController) { }
  
  ngOnInit() {
    this.finalizarLogin();
  }

  async finalizarLogin(){
    console.log(this.route.url);
    let pos = this.route.url.indexOf('#');
    if (pos > -1){
      let subcadena = this.route.url.substring(pos+1);
      console.log(subcadena);
      let parametros = subcadena.split('&');
      console.log(parametros);
      this.respuesta = 'exito';
      //this.presentLoading();
      let token = '';
      let tokenRf = '';
      let instancia = '';
      let signa = '';
      let scope = '';
      let ttype = '';
      let idUsu= '';
      for(let i=0;i<parametros.length; i++){
        
        let aux = parametros[i].split('=');
        console.log(aux)
        switch(aux[0]){
          case 'access_token': token=aux[1];break;
          case 'refresh_token': tokenRf=aux[1];break;
          case 'instance_url': instancia=aux[1];break;
          case 'signature': signa=aux[1];break;
          case 'scope': scope=aux[1];break;
          case 'token_type': ttype=aux[1];break;
          case 'id': idUsu=aux[1];break;
        }
      }
      let data={
        access_token:token,
        refresh_token:tokenRf,
        instance_url:instancia,
        signature:signa,
        scope:scope,
        token_type:ttype,
        idUsu:idUsu
      }
      this.authService.storeUserData(data);
      //this.loading.dismiss();
      

      setTimeout(() => {
        this.route.navigate(['/inicio']);
      }, 1000); 
    } else {
      let posErr = this.route.url.indexOf('?');
      let subcadenaError = this.route.url.substring(posErr+1);
      let parametrosErrores = subcadenaError.split('&');
      this.respuesta=parametrosErrores[0]+'<br>'+parametrosErrores[1];
      console.log(parametrosErrores);
      setTimeout(() => {
        this.route.navigate(['/']);
      }, 5000); 
      
    }
  }

  

  /* Alert de ionic */
  async presentAlert(title: any, descrip: any) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: '',
      message: descrip,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentToast(msj: any, back: any) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'top',
      color: back,
    });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor espere...',
    });
    await this.loading.present();
  }
  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Iniciando...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

}
