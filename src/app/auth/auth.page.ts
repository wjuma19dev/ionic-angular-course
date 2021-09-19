import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authSvc.login();
    this.router.navigateByUrl('/places/tabs/discover');
  }

}
