import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
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
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-queues-list',
  templateUrl: './queues-list.page.html',
  styleUrls: ['./queues-list.page.scss'],
})
export class QueuesListPage implements OnInit {
  loading: any;
  @ViewChild('popover') popover: any = null;

  isOpen = false;

  @ViewChild(DatatableComponent) table: DatatableComponent | any = null;

  selected = [];
  mensajes = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Sin datos',

    // Footer total message
    totalMessage: '',

    // Footer selected message
    selectedMessage: 'de',
  };
  ColumnMode = 'force';
  SelectionType = SelectionType;

  tokenSF: any = '';
  tokenRF: any = '';
  instancia: any = '';

  rows: any[] = [];
  temp: any[] = [];
  columns = [
    { name: 'Nombre', width: 250, prop: 'name' },
    { name: 'Cola', prop: 'cola', width: 150 },
  ];
  reorderable = true;
  loadingIndicator = true;
  usuarioConectado: any;
  constructor(
    public alertController: AlertController,
    private authService: AuthService,
    public loadingController: LoadingController,
    public route: Router,
    private navCtrl: NavController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    let logueado: any = localStorage.getItem('tokenSF');
    this.usuarioConectado = localStorage.getItem('usuarioConectadoSF');
    this.tokenSF = localStorage.getItem('tokenSF');
    this.tokenRF = localStorage.getItem('tokenRefreshSF');
    this.instancia = localStorage.getItem('instanciaUrlSF');
    //this.authService.updateLogin(true);
    console.log(this.instancia, this.tokenSF);
    let listaDeColas: string[] = [];
    let query =
      "/services/data/v56.0/query/?q=SELECT Id, Name FROM Group WHERE Type = 'Queue' AND Id IN (SELECT GroupId FROM GroupMember WHERE UserOrGroupId = '" +
      this.usuarioConectado +
      "') AND Id IN (SELECT QueueId FROM QueueSobject WHERE SobjectType = 'Lead')";
    this.authService
      .executeQuery(this.instancia + query, this.tokenSF)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        if (resp.totalSize > 0) {
          resp.records.forEach((item: any) => {
            console.log(item);
            listaDeColas.push(item.Id);
          });
          this.obtenerProspectos(listaDeColas);
        } else {
          this.presentToast('top', 'No se encontro colas', 5000, 'danger');
          this.loadingIndicator = false;
        }
      })
      .catch(() => {
        console.log('error');
      });
  }

  obtenerProspectos(colas: string[]) {
    let where = ' WHERE ';
    let contador = 0;
    colas.forEach((item: string) => {
      if (contador == 0) {
        where += " OwnerId='" + item + "' ";
      } else {
        where += " OR OwnerId='" + item + "' ";
      }
      contador++;
    });
    let query =
      '/services/data/v56.0/query/?q=SELECT Id, FirstName,Name,Owner.Name FROM Lead' + where;
    console.log(query);
    this.authService
      .executeQuery(this.instancia + query, this.tokenSF)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        if (resp.totalSize > 0) {
          this.rows = [];
          for (let i = 0; i < resp.totalSize; i++) {
            let aux = {
              name: resp.records[i].Name,
              cola: resp.records[i].Owner.Name,
              id: resp.records[i].Id,
            };
            this.rows.push(aux);
          }
          this.temp = [...this.rows];
          this.loadingIndicator = false;
        } else {
          this.presentToast('top', 'No se encontro colas', 5000, 'danger');
          this.loadingIndicator = false;
        }
      })
      .catch(() => {
        console.log('error');
      });
  }

  async logout() {
    this.authService.logout();
  }

  onChange($event: any) {
    console.log($event);
  }

  onSelect(selected: any) {
    this.presentPopover(selected);
    console.log('Select Event', selected, this.selected);
    
  }

  onAceptar(){
    console.log('Entra');
    console.log(this.selected);
    this.isOpen =false;
    this.actualizarPropietario();
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }

  updateFilter(event: any) {
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

  newLead() {
    this.navCtrl.navigateForward('/create-lead');
  }

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    mensaje: string,
    duration: number,
    tipo: string
  ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duration,
      position: position,
      color: tipo,
    });

    await toast.present();
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  actualizarPropietario() {
    this.showLoading();
    
    let query =
      "/services/data/v56.0/sobjects/Lead/"+this.selected[0]['id'];
    console.log(query);
    console.log(this.selected[0]);
    let dataEnviar:any = {
      OwnerId: this.usuarioConectado
    }
    console.log(dataEnviar);
    this.authService
      .executeQueryPatch(this.instancia + query, this.tokenSF, dataEnviar)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        
        this.loading.dismiss();
        this.presentToast('top','Se modifico con exito',5000,'success')
        setTimeout(() => {
          this.navCtrl.navigateRoot('/');
        }, 5000);
      },
        msg => { // Error
        console.log(msg)
        this.loading.dismiss();
        this.presentToast('top','Error:'+msg.error[0].message,5000,'danger')
      })
      .catch((e) => {
        this.loading.dismiss();
        console.log('error');
      });
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando..',
    });

    this.loading.present();
  }
}
