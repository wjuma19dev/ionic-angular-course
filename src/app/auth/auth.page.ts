import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  public isLogin = true;

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
      });
  }

  onSwitchAuthModel() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log({ email, password });
    if (this.isLogin) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }

}
