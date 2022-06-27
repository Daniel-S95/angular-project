import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  public constructor(private _stateService: StateService, private _router: Router) { }

  canActivate() {
    if (this._stateService.userType === "USER") {
      return true;
    }

    this._router.navigate(['/']);
    return false;
  }
}
