import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonModal,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { CalendarComponent } from 'ionic7-calendar';
import { CalendarMode, QueryMode, Step } from 'ionic7-calendar';
import { AuthService } from 'src/app/services/auth.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

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
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
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

  rows:any[] = [];
  temp:any[] = [];
  columns = [{ name: 'Nombre',width:300, prop:'name' }];
  reorderable = true;
  loadingIndicator = true;
  openModal = false;
  /*****************/
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;
  @ViewChild(IonModal) modal: IonModal| any = null;
  
  eventSource: any = [];
  viewTitle: any;

  isToday: boolean;

  calendar = {
    mode: 'month' as CalendarMode,
    queryMode: 'local' as QueryMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
    formatDay: "'Day' dd",
    formatDayHeader: "'Day' EEE",
    formatDayTitle: "'Day' MMMM dd, yyyy",
    formatWeekTitle: "'Week' w",
    formatWeekViewDayHeader: "'Day' EEE d",
    formatHourColumn: "'hour' ha",
    showEventDetail: false,
    startingDayMonth: 2,
    startingDayWeek: 2,
    allDayLabel: 'testallday',
    noEventsLabel: 'None',
    timeInterval: 15,
    autoSelect: false,
    //locale: 'es-ES',
    dir: 'rtl',
    scrollToHour: 3,
    preserveScrollPosition: true,
    lockSwipeToPrev: true,
    lockSwipeToNext: true,
    lockSwipes: true,
    startHour: 9,
    endHour: 16,
    sliderOptions: {
      spaceBetween: 10,
    },
  };
  /***************/
  cargaTotal: boolean = false;
  loading: any;
  tokenSF: any = '';
  tokenRF: any = '';
  instancia: any = '';
  tipoNuevoEvento:string='nuevo';
  esNuevo=true;
  esExistente=false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.loading = this.loadingCtrl.create({
      message: 'Cargando',
    });
    this.isToday = false;
  }

  ngOnInit() {
    this.showLoading();
    this.tokenSF = localStorage.getItem('tokenSF');
    this.tokenRF = localStorage.getItem('tokenRefreshSF');
    this.instancia = localStorage.getItem('instanciaUrlSF');

    console.log(this.instancia, this.tokenSF);
    this.loadEvents();
    this.getLeads();
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
  /*************** */
  loadEvents() {
    //this.eventSource = this.createRandomEvents();
    
      let usuConectado: any = '';
      if (localStorage.getItem('usuarioConectadoSF') != null) {
        usuConectado = localStorage.getItem('usuarioConectadoSF');
      }
      let query =
        "/services/data/v56.0/query/?q=SELECT+Id,+OwnerId,+Owner.Name,+Subject,+IsAllDayEvent,+ActivityDate,+EndDateTime,+ActivityDateTime,+StartDateTime,+WhoId,+who.Name,+Type,+Location,+Link_Reunion__c+FROM+Event+WHERE+OwnerId=+'" +
        usuConectado +
        "'+AND+StartDateTime>=+TODAY+AND+WhoId<>null";
      this.authService
        .executeQuery(this.instancia + query, this.tokenSF)
        .toPromise()
        .then((resp: any) => {
          console.log(resp);
          let events = [];
          if (resp.totalSize > 0) {
            for (let i = 0; i < resp.totalSize; i++) {
              console.log(resp.records[i]);
              var iniciPicado = resp.records[i].StartDateTime.split('.');
              var finPicado = resp.records[i].EndDateTime.split('.');

              var auxIni = new Date(iniciPicado[0]);
              auxIni.setHours(auxIni.getHours() - 3);
              var auxFin = new Date(finPicado[0]);
              auxFin.setHours(auxFin.getHours() - 3);
              console.log(auxIni);
              console.log(auxFin);
              events.push({
                title: resp.records[i].Subject,
                startTime: auxIni,
                endTime: auxFin,
                allDay: false,
                idCita: resp.records[i].Id,
                nombre:resp.records[i].Who.Name
              });
            }
          }
          this.eventSource = events;
          this.loading.dismiss();
        })
        .catch((e) => {
          console.log('error'+e);
          this.loading.dismiss();
        });
    
  }

  loadDynamicEvents() {
    let startTime = new Date('2023-01-20T03:00:40');
    let endTime = new Date('2023-01-22T05:39:22');

    this.eventSource.push({
      title: 'test',
      startTime: startTime,
      endTime: endTime,
      allDay: false,
    });
    this.myCalendar.loadEvents();
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
    console.log(
      'view title changed: ' + title + ', this.viewTitle: ' + this.viewTitle
    );
  }

  onEventSelected(event: any) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title+
        ',' +
        event.idCita+
        ',' +
        event.nombre
    );
    this.navCtrl.navigateForward('/detail-event/' + event.idCita);
  }

  crearProspecto(){
    this.navCtrl.navigateForward('/create-lead/true');
  }

  changeMode(mode: any) {
    this.calendar.mode = mode.detail.value;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev: any) {
    console.log(
      'Selected time: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onCurrentDateChanged(ev: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
    console.log('Currently viewed date: ' + ev);
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 100; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    return events;
  }

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
    this.eventSource = this.createRandomEvents();
  }

  onDayHeaderSelected = (ev: {
    selectedTime: Date;
    events: any[];
    disabled: boolean;
  }) => {
    console.log(
      'Selected day: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  verificarTipo(e:any){
    console.log(this.tipoNuevoEvento);
    if (this.tipoNuevoEvento =='nuevo'){
      this.esExistente = false;
      this.esNuevo = true;
    } else {
      this.esExistente = true;
      this.esNuevo = false;
    }
  }

  getLeads(){
    let query = '/services/data/v56.0/query/?q=SELECT+Id,+Name,+Phone,+Email,+Status+FROM+Lead+WHERE+IsConverted=FALSE';
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

  onChange($event:any) {
    console.log($event);
  }

  onSelect(selected:any) {
    console.log('Select Event', selected, this.selected);
    this.modal.dismiss();
    this.navCtrl.navigateForward('/crear-visita/' + selected.selected[0].id);
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
  closeModal(){
    this.openModal = false;
  }
}
