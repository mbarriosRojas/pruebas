import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Prospecto } from 'src/app/models/prospecto';
import { optionSelect } from 'src/app/models/prospecto';

@Component({
  selector: 'app-detail-lead',
  templateUrl: './detail-lead.page.html',
  styleUrls: ['./detail-lead.page.scss'],
})
export class DetailLeadPage implements OnInit {
  tokenSF: any = '';
  tokenRF: any = '';
  instancia: any = '';

  optsProductos: optionSelect[] = [];
  optsParque: optionSelect[] = [];
  optsTipoCinerario: optionSelect[] = [];
  optsProspectoContactado: optionSelect[] = [];
  optsMotivoNoContactado: optionSelect[] = [];
  optsRespuestaContacto: optionSelect[] = [];
  optsMotivo: optionSelect[] = [];
  optsStatus: optionSelect[] = [];
  

  optsNecesidad: optionSelect[] = [];
  optsOrigen: optionSelect[] = [];
  optsGrupoFuente:optionSelect[] = [];
  optsCodigoFuente:optionSelect[] = [];
  optsComu1:optionSelect[] = [];
  optsComu2:optionSelect[] = [];
  optsProfesion:optionSelect[] = [];

  todasOptMotivoNocontacta: any = {};
  todasOptRespuestas: any = {};

  todasOptCodigoFuente: any = {};
  auxFNacimiento:string='';
  auxTomadorDecision:string='false';
  auxTieneSepul:string='false';
  datosProspecto: Prospecto = {
    Id: '',
    Apellido_Materno__c: '',
    Capacidad__c: 0,
    FirstName: '',
    Email: '',
    LastName: '',
    Motivo_no_contacto__c: '',
    Motivo__c: '',
    Parque_Cotizacion__c: '',
    Parque__c: '',
    Producto__c: '',
    Prospecto_Contactado__c: '',
    Respuesta_Contacto__c: '',
    Rut__c: '',
    Status: '',
    Segundo_Apellido__c: '',
    Phone: '',
    MiddleName: '',
    Tipo_de_Cinerario__c: '',
    attributes: { type: '', url: '' },

    Necesidad__c: '',
    LeadSource: '',
    Grupos_Fuente__c:'',
    Descripcion_Fuente__c:'',
    Rut_Referidor__c:'',
    Nombre_Referidor__c:'',
    Comuna1_Completa__c:'',
    Comuna2_Completa__c:'',
    Birthday__c:'',
    Profesion__c:'',
    Grupo_Familiar__c:0,
    Tomador_de_decision__c: false,
    Posible_Pie__c: 0,
    Forma_de_Pago__c:'',
    Cuota__c:0,
    Tiene_sepultura__c:false,
    Donde__c:''
  };

  idLead: any = '';
  segmentoActivo = true;

  loading: any;
  cargaCompleta = false;
  
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
      this.getvaloresPicklist();
    });
  }

  getvaloresPicklist() {
    let query =
      '/services/data/v56.0/ui-api/object-info/Lead/picklist-values/012000000000000AAA';
    console.log(query);

    this.authService
      .executeQuery(this.instancia + query, this.tokenSF)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        //llenar optProductos
        this.optsProductos = [];
        resp.picklistFieldValues.Producto__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsProductos.push(opt);
          }
        );
        //llenar optParque
        resp.picklistFieldValues.Parque__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsParque.push(opt);
          }
        );
        //llenar optTipoCinerario
        resp.picklistFieldValues.Tipo_de_Cinerario__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsTipoCinerario.push(opt);
          }
        );
        //llenar optProspectoContactado
        resp.picklistFieldValues.Prospecto_Contactado__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsProspectoContactado.push(opt);
          }
        );
        //llenar optMotivo no contacto
        this.todasOptMotivoNocontacta =
          resp.picklistFieldValues.Motivo_no_contacto__c;
        // Respuesta contacto
        resp.picklistFieldValues.Respuesta_Contacto__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsRespuestaContacto.push(opt);
          }
        );
        //Llenar opt respuestas contacto
        this.todasOptRespuestas = resp.picklistFieldValues.Motivo__c;
        // Llenar estatus
        resp.picklistFieldValues.Status.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsStatus.push(opt);
          }
        );

        //llenar picklist de necesidad
        this.optsNecesidad = [];
        resp.picklistFieldValues.Necesidad__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsNecesidad.push(opt);
          }
        );

        //llenar picklist de origen
        this.optsOrigen = [];
        resp.picklistFieldValues.LeadSource.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsOrigen.push(opt);
          }
        );

        //llenar picklist grupo fuente
        this.optsGrupoFuente = [];
        resp.picklistFieldValues.Grupos_Fuente__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsGrupoFuente.push(opt);
          }
        );

        //Llenar opt codigoFuente
        this.todasOptCodigoFuente = resp.picklistFieldValues.Descripcion_Fuente__c;

        //llenar picklist comuna 1
        this.optsComu1 = [];
        resp.picklistFieldValues.Comuna1_Completa__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsComu1.push(opt);
          }
        );

        //llenar picklist comuna 1
        this.optsComu2 = [];
        resp.picklistFieldValues.Comuna2_Completa__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsComu2.push(opt);
          }
        );
        
        //llenar picklist profesion
        this.optsProfesion = [];
        resp.picklistFieldValues.Profesion__c.values.forEach(
          (element: { label: string; value: string }) => {
            let opt: optionSelect = { label: '', value: '' };
            opt.label = element.label;
            opt.value = element.value;
            this.optsProfesion.push(opt);
          }
        );

        this.getDatosProspecto();
      })
      .catch(() => {
        this.loading.dismiss();
        console.log('error');
      });
  }

  dependenciaNoContacto(e: any) {
    let aux = this.datosProspecto.Prospecto_Contactado__c;
    this.optsMotivoNoContactado = [];
    this.todasOptMotivoNocontacta.values.forEach(
      (element: { label: string; value: string; validFor: any[] }) => {
        if (
          element.validFor[0] ==
          this.todasOptMotivoNocontacta.controllerValues[aux]
        ) {
          let opt: optionSelect = { label: '', value: '' };
          opt.label = element.label;
          opt.value = element.value;
          this.optsMotivoNoContactado.push(opt);
        }
      }
    );
  }

  dependenciaRespuesta(e: any) {
    let aux = this.datosProspecto.Respuesta_Contacto__c;
    this.optsMotivo = [];
    console.log(aux);
    console.log(this.todasOptRespuestas.controllerValues[aux]);
    this.todasOptRespuestas.values.forEach(
      (element: { label: string; value: string; validFor: any[] }) => {
        if (
          element.validFor[0] == this.todasOptRespuestas.controllerValues[aux]
        ) {
          let opt: optionSelect = { label: '', value: '' };
          opt.label = element.label;
          opt.value = element.value;
          this.optsMotivo.push(opt);
        }
      }
    );
  }

  dependenciaCodigoFuente(e: any) {
    console.log(e);
    let aux = '';
    console.log(this.datosProspecto.Grupos_Fuente__c);
    if (this.datosProspecto.Grupos_Fuente__c != undefined){
      aux = this.datosProspecto.Grupos_Fuente__c;
    }
    
    this.optsCodigoFuente = [];
    console.log(this.todasOptCodigoFuente);
    this.todasOptCodigoFuente.values.forEach(
      (element: { label: string; value: string; validFor: any[] }) => {
        if (
          element.validFor[0] ==
          this.todasOptCodigoFuente.controllerValues[aux]
        ) {
          let opt: optionSelect = { label: '', value: '' };
          opt.label = element.label;
          opt.value = element.value;
          this.optsCodigoFuente.push(opt);
        }
      }
    );
  }

  getDatosProspecto() {
    let query =
      "/services/data/v56.0/queryAll/?q=SELECT+Id,+Apellido_Materno__c,+Capacidad__c,+FirstName,+MiddleName,+Profesion__c,+"+
      "LastName,+Motivo_no_contacto__c,+Motivo__c,+Parque_Cotizacion__c,+Parque__c,+Producto__c,+Prospecto_Contactado__c,+"+
      "Respuesta_Contacto__c,+Rut__c,+Segundo_Apellido__c,+Status,+Phone,+Email,+Rut_Referidor__c,+Nombre_Referidor__c,+Birthday__c,+"+
      "Necesidad__c,+LeadSource,+Grupos_Fuente__c,+Descripcion_Fuente__c,+Comuna1_Completa__c,+Comuna2_Completa__c,+Donde__c,+"+
      "Grupo_Familiar__c,+Tomador_de_decision__c,+Posible_Pie__c,+Forma_de_Pago__c,+Cuota__c,+Tiene_sepultura__c+"+
      "FROM+Lead+Where+Id+=+'" +
      this.idLead +
      "'";
    console.log(query);

    this.authService
      .executeQuery(this.instancia + query, this.tokenSF)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        this.datosProspecto = resp.records[0];
        console.log(this.datosProspecto);
        this.dependenciaCodigoFuente(null);
        this.dependenciaNoContacto(null);
        this.dependenciaRespuesta(null);
        if (this.datosProspecto.Birthday__c){
          let aux = new Date(this.datosProspecto.Birthday__c);
          this.auxFNacimiento =aux.toISOString();
          console.log(aux.toISOString());
        } else {
          this.auxFNacimiento = '1930-01-01';
        }
        if (this.datosProspecto.Tomador_de_decision__c){
          this.auxTomadorDecision = 'true';
        }
        if (this.datosProspecto.Tiene_sepultura__c) {
          this.auxTieneSepul = 'true';
        }
        this.cargaCompleta = true;
        this.loading.dismiss();
        
      })
      .catch((e) => {
        this.loading.dismiss();
        this.cargaCompleta = true;
        console.log('error',e);
      });
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

  guardar() {
    this.showLoading();
    console.log(this.datosProspecto);
    console.log(this.auxFNacimiento);
    if (this.auxFNacimiento != '1930-01-01'){
      this.datosProspecto.Birthday__c = this.auxFNacimiento;
    }
    this.datosProspecto.Tomador_de_decision__c = false;
    if (this.auxTomadorDecision == 'true'){
      this.datosProspecto.Tomador_de_decision__c = true;
    }
    this.datosProspecto.Tiene_sepultura__c = false;
    if (this.auxTieneSepul == 'true'){
      this.datosProspecto.Tiene_sepultura__c = true;
    }
    let query = this.datosProspecto.attributes?.url;
    console.log(query);
    let dataEnviar = Object.assign({}, this.datosProspecto);
    delete dataEnviar.Id;
    delete dataEnviar.attributes;
    this.authService
      .executeQueryPatch(this.instancia + query, this.tokenSF, dataEnviar)
      .toPromise()
      .then((resp: any) => {
        console.log(resp);
        //this.datosProspecto = resp.records[0];
        console.log(this.datosProspecto);
        this.loading.dismiss();
        this.presentToast('top','Se modifico con exito',5000,'success')
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

  crearCita(){
    this.navCtrl.navigateForward('/crear-visita/' + this.idLead);
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
