import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonInput } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-new-service-user',
  templateUrl: './new-service-user.page.html',
  styleUrls: ['./new-service-user.page.scss'],
})
export class NewServiceUserPage implements OnInit {
  constructor(public zone: NgZone) {}

  ngOnInit() {}
}
