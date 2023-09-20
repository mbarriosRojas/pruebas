import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  baseUrl: string = 'https://losparques--dev.sandbox.my.salesforce.com/services/oauth2/token?';
  public headersToken!: HttpHeaders;
  error_formato_img: boolean | undefined;
  supported_imgs: string[] = ['jpg', 'jpeg', 'png'];
  supported_doc: string[] = ['pdf', 'xls', 'pdf'];
  imgs: any;
  imagen_seleccionada: any;
  imgs_path: any;
  dataCiudad: any;
  dataServicio: any;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public router: Router
  ) {}
  public storeUserData(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
  getUser() {
    this.user = localStorage.getItem('user');
    return this.user;
  }
  authenticateSalesF(object: any) {
    this.headersToken = this.setHeaders();
    let Url = this.baseUrl+object
    return this.http.post(Url,  { headers: this.headersToken });
  }
  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  public setHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Headers': 'Origin'
    });
  }
}
