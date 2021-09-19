import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  onLogin() {
    this.authSvc.login();

    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    })
      .then(loading => {
        loading.present();
        setTimeout(() => {
          loading.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 2000);
      })

  }

}
