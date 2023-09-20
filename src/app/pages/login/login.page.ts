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

  ngOnInit() {}
  async login() {
    // eslint-disable-next-line eqeqeq
    if (this.email != '' && this.clave != '') {
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
