import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  items: any = [];
  us: any;

  constructor(private authService: AuthService) {
    this.us =  JSON.parse(this.authService.getUser());
    console.log(this.us);
  }

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    for (let i = 0; i < 10; i++) {
      this.items.push({
        id: this.items.length + 1,
        nombre: 'name '+ this.items.length + 1,
        foto: 'https://picsum.photos/80/80?random='+ this.items.length + 1,
      });
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}