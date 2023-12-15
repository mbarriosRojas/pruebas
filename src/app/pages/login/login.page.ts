import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any = '';
  clave: any = '';
  loading: any;
  user: any = {};

  constructor(
    public alertController: AlertController,
    private authService: AuthService,
    public loadingController: LoadingController,
    public router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    let logueado:any = localStorage.getItem('tokenSF');
    console.log('Actual:',logueado);
    console.log(this.authService.logueado);
    if (logueado != null && logueado != undefined){
      this.authService.refreshTokenSalesForce().toPromise()
      .then((resp: any) => {
        console.log(resp);
        if(resp.access_token != null && resp.access_token != undefined){
          localStorage.setItem('tokenSF', resp.access_token);
          console.log('Nuevo:',localStorage.getItem('tokenSF'));
          this.authService.updateLogin(true);
          this.router.navigate(['/inicio']);
        }
        //
      })
      .catch(() => {
        console.log('error en token refrest se debe conectar de nuevo');
        this.authService.logueado=false;
        this.authService.updateLogin(this.authService.logueado);
      });
    }
  }
  async login() {
    window.open('https://test.salesforce.com/services/oauth2/authorize?response_type=token&client_id='+this.authService.clientIdSalesforce+'&redirect_uri=capacitor://localhost/respuestaLogin&state=mystate&display=touch','_self');
    // eslint-disable-next-line eqeqeq
    /*if (this.email != '' && this.clave != '') {
      this.presentLoading();
      this.user =
      'grant_type=password'+
      '&client_id=3MVG9Fy_1ZngbXqOy6PQxi8Io2HtCNlZ7dDj_CfytmTus6P6Xw1qr.NQEy2G2u6XKYueRe_kNWYRE_LPGQYAh'+
      '&client_secret=B45907BFDFE10A87D04BA3602698FE851CCBBD8DFFFE146ACAA8EDB7BA47FABF'+
      '&username='+this.email.toLowerCase()+
      '&password='+this.clave+'e6BghGucGuU5csHbi0V01NrmB'
      this.authService
        .authenticateSalesF(this.user)
        .toPromise()
        .then((resp: any) => {
          this.authService.storeUserData(resp);
          this.loading.dismiss();
          this.router.navigate(['/tabs/tabs/tab1']);
        })
        .catch(() => {
          this.loading.dismiss();
          this.presentToast('Error, Por favor intente de nuevo', 'danger');
        });
    } else {
      this.loading.dismiss();
      this.presentToast(
        'Llena los campos para poder continuar. Por favor intente de nuevo',
        'danger'
      );
    }*/
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
