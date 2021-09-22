import { Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class AuthService {

  private _userAuthenticate: boolean = true;
  private _userId: string = 'abc';

  constructor() {}

  get userIsAuthenticate() {
    return this._userAuthenticate;
  }

  get userId() {
    return this._userId;
  }

  login() {
    this._userAuthenticate = true;
  }

  logout() {
    this._userAuthenticate = false;
  }

}
