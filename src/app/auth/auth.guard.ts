import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { CanLoad, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ){}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}