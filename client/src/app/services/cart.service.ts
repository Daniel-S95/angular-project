import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartItem } from '../models/ICartItem';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public isCartOpen: boolean = false;
  public cartId: number = null;
  public cartCreationDate: Date = null;
  public cartTotalValue: number = null;
  public cartItems = [];

  constructor(private _http: HttpClient, private _snackBarService: SnackBarService) { }

  public addProductToCart(cartData: { productId: number, quantity: number }) {
    return this._http.post('http://localhost:3001/api/carts/item', cartData);
  }

  public createCart() {
    return this._http.post('http://localhost:3001/api/carts', {});
  }

  public deleteCart(cartId: number) {
    return this._http.delete(`http://localhost:3001/api/carts/${cartId}`);
  }

  public getCartItems(cartId: number) {
    this._http.get(`http://localhost:3001/api/carts/${cartId}`)
      .subscribe((cartItems: ICartItem[]) => {
        this.cartItems = cartItems;
        this.cartTotalValue = this.calculateCartTotalValue();
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
  }

  public updateCartItemQuantity(cartData: { productId: number, quantityAdded: number }) {
    let cartId = this.cartId;
    return this._http.put(`http://localhost:3001/api/carts/${cartId}`, cartData);
  }

  public deleteItemFromCart(cartItemId: number) {
    return this._http.delete(`http://localhost:3001/api/carts/item/${cartItemId}`);
  }

  public calculateCartTotalValue() {
    return this.cartItems.reduce((totalOrderValue: number, obj: { totalPrice: number }) => obj.totalPrice + totalOrderValue, 0);
  }
}
