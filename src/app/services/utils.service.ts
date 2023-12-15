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
export class UtilsService {  }
