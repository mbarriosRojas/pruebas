import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logueado:boolean=false;
  private loginSubject$ = new BehaviorSubject<boolean>(this.logueado);
  loginChanged$ = this.loginSubject$.asObservable();

  clientIdSalesforce:string='3MVG9Fy_1ZngbXqOy6PQxi8Io2HtCNlZ7dDj_CfytmTus6P6Xw1qr.NQEy2G2u6XKYueRe_kNWYRE_LPGQYAh';
  clientSecretSalesforce:string= 'B45907BFDFE10A87D04BA3602698FE851CCBBD8DFFFE146ACAA8EDB7BA47FABF';

  urlSalesforceRefrest:string='https://losparques--dev.sandbox.my.salesforce.com/services/oauth2/token?grant_type=refresh_token&client_id='+this.clientIdSalesforce+'&client_secret='+this.clientSecretSalesforce+'&refresh_token=';

  authToken: any;
  user: any;
  baseUrl: string = 'https://losparques--dev.sandbox.my.salesforce.com/services/oauth2/token?grant_type=';
  public headersToken!: HttpHeaders;
  
  dataServicio: any;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public router: Router
  ) {}
  public storeUserData(user: any) {
    localStorage.setItem('tokenSF', user.access_token);
    localStorage.setItem('tokenRefreshSF', user.refresh_token);
    localStorage.setItem('instanciaUrlSF',user.instance_url);
    localStorage.setItem('signaSF',user.signature);
    localStorage.setItem('scopeSF',user.scope);
    localStorage.setItem('token_typeSF',user.token_type);
    localStorage.setItem('urlUsuario',user.idUsu);
    this.getDataUsuario();
    return true;
  }
  getUser() {
    this.user = localStorage.getItem('user');
    return this.user;
  }
  refreshTokenSalesForce() {
    let tokenRefreshSF:any = localStorage.getItem('tokenRefreshSF');
    this.headersToken = this.setHeadersRefresh();
    let Url = this.urlSalesforceRefrest+tokenRefreshSF;
    return this.http.post(Url,  { headers: this.headersToken });
  }

  executeQuery(query:string,token:string){
    this.headersToken = this.setHeaders(token);
    let Url = query;
    console.log(Url);
    return this.http.get(Url,  { headers: this.headersToken });
  }
  executeQueryPatch(query:string,token:string, data:any){
    this.headersToken = this.setHeaders(token);
    let Url = query;
    console.log(Url);
    return this.http.patch(Url, data,{ headers: this.headersToken });
  }
  executeQueryPost(query:string,token:string, data:any){
    this.headersToken = this.setHeaders(token);
    let Url = query;
    console.log(Url);
    return this.http.post(Url, data,{ headers: this.headersToken });
  }
  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('tokenSF');
    localStorage.clear();
    this.logueado = false;
    this.loginSubject$.next(false);
    this.router.navigate(['']);
  }
  public setHeaders(token:string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Headers': 'Origin',
      'Authorization':'Bearer '+token
    });
  }

  public setHeadersRefresh() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Headers': 'Origin'
    });
  }

  updateLogin(logueado:boolean){
    this.logueado = logueado;
    this.loginSubject$.next(logueado);
  }

  async getDataUsuario(){
    let tokenSF:any=localStorage.getItem('tokenSF');
    let urlInstancia:any = localStorage.getItem('instanciaUrlSF');
    console.log(urlInstancia);
    let urlusuario:any= localStorage.getItem('urlUsuario');
    console.log(urlusuario);

    let pos = urlusuario.indexOf('/id');
    let ruta = urlusuario.substring(pos);
    console.log(urlInstancia+'/'+ruta);
    this.executeQuery(urlInstancia+'/'+ruta,tokenSF).toPromise()
    .then((resp: any) => {
      console.log(resp);
      localStorage.setItem('usuarioSF', resp.nick_name);
      localStorage.setItem('emailSF', resp.email);
      localStorage.setItem('primerNombreSF',resp.first_name);
      localStorage.setItem('nombreSF',resp.display_name);
      localStorage.setItem('apellidoSF',resp.last_name);
      localStorage.setItem('telefonoSF',resp.mobile_phone);
      localStorage.setItem('fotoSF',resp.photos.thumbnail);
      localStorage.setItem('usuarioConectadoSF',resp.user_id);
      this.logueado = true;
      this.loginSubject$.next(this.logueado);
    })
    .catch(() => {
      console.log('error');
    });
  }
}
