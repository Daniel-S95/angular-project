import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import IUser from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private userType: string;

  public constructor(private _router: Router) { }

  public canActivate(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: IUser = helper.decodeToken(token!);
      this.userType = decodedToken.userType;
    }

    if (this.userType) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }
}
