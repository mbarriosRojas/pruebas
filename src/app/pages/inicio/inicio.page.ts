import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { AuthService } from 'src/app/services/auth.service';


export interface Data {
  id: string;
  name: string;
}

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent | any = null;
  
  selected = [];
  mensajes = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Sin datos',
  
    // Footer total message
    totalMessage: '',
  
    // Footer selected message
    selectedMessage: 'de'
  };
  ColumnMode = 'force';
  SelectionType = SelectionType;


  tokenSF:any='';
  tokenRF:any='';
  instancia:any='';

  rows:any[] = [];
  temp:any[] = [];
  columns = [{ name: 'Nombre',width:300, prop:'name' }, { name: 'Estados',prop:'telefono',width:150 }];
  reorderable = true;
  loadingIndicator = true;
  usuarioConectado:any='';
  constructor(public alertController: AlertController,
    private authService: AuthService,
    public loadingController: LoadingController,
    public route: Router,
    private navCtrl: NavController,
    public toastController: ToastController) {
      
     }

  ngOnInit() {
    let logueado:any = localStorage.getItem('tokenSF');
    this.tokenSF=localStorage.getItem('tokenSF');
    this.tokenRF=localStorage.getItem('tokenRefreshSF');
    this.instancia= localStorage.getItem('instanciaUrlSF');
    this.usuarioConectado = localStorage.getItem('usuarioConectadoSF');
    //this.authService.updateLogin(true);
    console.log(this.instancia,this.tokenSF);
    let query = "/services/data/v56.0/query/?q=SELECT+Id,+Name,+Phone,+Email,+Status+FROM+Lead+WHERE+IsConverted=FALSE+AND+OwnerId='"+this.usuarioConectado+"'";
    this.authService.executeQuery(this.instancia+query,this.tokenSF).toPromise()
    .then((resp: any) => {
      console.log(resp);
      if(resp.totalSize > 0){
        this.rows = [];
        for(let i = 0; i< resp.totalSize;i++){
          let aux = {
            'email':resp.records[i].Email,'name':resp.records[i].Name,'telefono':resp.records[i].Status, 'id':resp.records[i].Id
          }
          this.rows.push(aux);

        }
        this.temp = [...this.rows];
        this.loadingIndicator =false;
      }
      
    })
    .catch(() => {
      console.log('error');
    });
  }

  async logout() {
    this.authService.logout();
  }

  onChange($event:any) {
    console.log($event);
  }

  onSelect(selected:any) {
    console.log('Select Event', selected, this.selected);
    this.navCtrl.navigateForward('/detail-lead/' + selected.selected[0].id);
  }

  onActivate(event:any) {
    console.log('Activate Event', event);
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  newLead(){
    this.navCtrl.navigateForward('/create-lead');
  }
}
