import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router, private loadingController: LoadingController) { }
  async logout(){
    const loadingIndicator = await this.showLoadingIndictator();
    await this.router.navigate(['/']);
    loadingIndicator.dismiss();
  }
  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Saliendo...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
