import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any=[  
    { 
    title : 'Inicio',
    url   : '/',
    icon  : 'home-outline' 
    },
  { 
    title : 'Agenda',  
    url   : '/calendario',  
    icon  : 'calendar-number-outline'  
  },
  {
    title:'Colas',
    url:'/queues-list',
    icon:'analytics-outline'
  }
]; 

  avatarUsuario:any='';
  nombreUsuario:any='';
  logueado:boolean= false;
  loginChangedSubscription: Subscription;
  constructor(private navCtrl: NavController,private authService: AuthService) {
    
    this.loginChangedSubscription = this.authService.loginChanged$.subscribe((loginValue)=>{
      this.logueado = loginValue;  
      console.log(this.logueado);
      this.nombreUsuario = localStorage.getItem('usuarioSF');
      this.avatarUsuario = localStorage.getItem('fotoSF');
    })
    
    
  }
  async logout() {
    this.authService.logout();
  }

  calendario(){
    this.navCtrl.navigateForward('/calendario');
  }

  inicio(){
    this.navCtrl.navigateForward('/inicio' );
  }
}
