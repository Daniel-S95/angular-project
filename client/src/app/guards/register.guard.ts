import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  public constructor(private _stateService: StateService, private _router: Router) { }

  public canActivate(): boolean {
    if (!this._stateService.isLogged) {
      return true;
    }

    this._router.navigate(['/']);
    return false;
  }
}
