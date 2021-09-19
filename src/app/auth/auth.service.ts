import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class AuthService {

  private _userAuthenticate = true;

  constructor() {}

  get userIsAuthenticate() {
    return this._userAuthenticate;
  }

  login() {
    this._userAuthenticate = true;
  }

  logout() {
    this._userAuthenticate = false;
  }

}