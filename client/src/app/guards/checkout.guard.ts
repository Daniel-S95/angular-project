import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  public constructor(private _stateService: StateService, private _router: Router, private _productService: ProductService) { }

  public canActivate(): boolean {
    if (this._stateService.userType === "USER" && this._stateService.isLogged && this._productService.products.length > 0) {
      return true;
    }

    this._router.navigate(['/']);
    return false;
  }
}
