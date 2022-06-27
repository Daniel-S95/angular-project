import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  public constructor(private _stateService: StateService, private _router: Router) {  }

  public canActivate(): boolean {
    if (this._stateService.userType === "ADMIN") {
      return true;
    }

    this._router.navigate(['/']);
    return false;
  }
}
