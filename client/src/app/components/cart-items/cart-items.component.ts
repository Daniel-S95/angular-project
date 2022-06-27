import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/ICartItem';
import { CartService } from 'src/app/services/cart.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  isShop: boolean = null;
  @Input() searchString = "";

  constructor(public _cartService: CartService, private _snackBarService: SnackBarService, private _router: Router) { }

  ngOnInit(): void {
    let url = this._router.url;

    if (url === "/shop") {
      this.isShop = true;
    } else if (url === "/checkout") {
      this.isShop = false;
    }
  }

  deleteItemFromCart(cartItem: ICartItem) {
    if (!cartItem) {
      return;
    }

    let { id: cartItemId, totalPrice } = cartItem;

    const numberOfCartItems = this._cartService.cartItems.length;

    const deleteCartItem = this._cartService.deleteItemFromCart(cartItemId);
    deleteCartItem.subscribe(() => {
      this._cartService.getCartItems(this._cartService.cartId);
      this._cartService.cartTotalValue = this._cartService.calculateCartTotalValue();

      if (numberOfCartItems === 1) {
        this.deleteUserCart();
      }
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }

  deleteUserCart() {
    const deleteCart = this._cartService.deleteCart(this._cartService.cartId);
    deleteCart.subscribe(() => {
      this._cartService.isCartOpen = false;
      this._cartService.cartId = null;
      this._cartService.cartCreationDate = null;
      this._cartService.cartTotalValue = null;
      this._cartService.cartItems = [];
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }
}
