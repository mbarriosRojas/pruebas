import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
export interface Video {
  title: string;
  url: string;
  thumb: string;
  subtitle: string;
}
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  baseUrl: string ='http://localhost:8080/';
  private base_maps_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private api_key = 'AIzaSyAIDSFRWmo4yNVf9hE4Yhk4C93SeBTsqwo';
  private videos: Video[] = [
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      subtitle: "By Blender Foundation",
      thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      title: "Big Buck Bunny"
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      subtitle: "By Blender Foundation",
      thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
      title: "Elephant Dream"
    },
  ];
  error_formato_img: boolean | undefined;
  public headersToken: HttpHeaders | undefined;
    supported_imgs: string[] = ['jpg', 'jpeg', 'png'];
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) { }
  public getVidoes(): Video[] {
    return this.videos;
  }
  get(path: string) {
    this.headersToken = this.setHeaders();
    return this.http.get('https://jsonplaceholder.typicode.com/todos', { headers: this.headersToken });
  }
  newPost(ruta: string, data: any) {
    return this.http.post<any>(`${this.baseUrl}${ruta}`, data);
  }
  getUbicacionDireccion(object: string) {
    console.log(object);
    const url: string =
      this.base_maps_url +
      object +
      '&sensor=false&key=' +
      this.api_key;
    return this.http.get(url);
  }
  handleFileInput(event: any, tipo: string) {
    return new Promise((success, fail) => {
      let eventoSel;
      eventoSel = event;
      let retorno;
      this.error_formato_img = false;
      let file;
      file = event;
      if (file.size > 10000000) {
        retorno = {
          success: false,
          error: this.error_formato_img,
          mensajeError:
            'La imagen que deseas cargar no debe pesar más de 2MB  ',
        };
        success(retorno);
      }else{
        if (file != null) {
          const file_split: string[] = file.name.split('.');
          const file_end: string = file_split[file_split.length - 1]
            .trim()
            .toLowerCase();
          let consulta;
          if (tipo === 'imgService') {
            console.log('soy logo');
            consulta = this.supported_imgs.includes(file_end);
          }
          console.log('consulta ===>', consulta);
          if (consulta) {
              const url = this.sanitizer.sanitize(
                SecurityContext.NONE,
                this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
              );
              retorno = {
                success: true,
                primeraImg:url,
                imagenesBase:url,
                fileS3:file,
               };
               success(retorno);
              } else {
              this.error_formato_img = true;
             retorno = {
              success: false,
              error: 'Error',
              mensajeError:
                'Debe ser un formato de imagen (jpg, jpeg,png)',
            };
            success(retorno);
          }
        }else{
          retorno = {
            success: false,
            error: 'Error',
            mensajeError:
              'Sebe seleccionar una imagen',
          };
          success(retorno);
        }
      }
    });
  }
  public setHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Headers': 'Origin'
    });
  }
}
