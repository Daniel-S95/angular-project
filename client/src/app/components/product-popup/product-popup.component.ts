import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartItem } from 'src/app/models/ICartItem';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent {

  quantityToAdd = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public product: IProduct, private _cartService: CartService, private _stateService: StateService,
    private _snackBarService: SnackBarService, public _popupRef: MatDialogRef<ProductPopupComponent>) { }

  addItemToCart() {
    let productToAdd = this.product;
    let quantityToAdd = this.quantityToAdd;

    if (!productToAdd || !quantityToAdd || quantityToAdd < 1) {
      this.quantityToAdd = 1;
      return;
    }

    if (this._cartService.isCartOpen) {
      this.checkIfProductExistsInCart(productToAdd, quantityToAdd);
    } else {
      const createCart = this._cartService.createCart();
      createCart.subscribe((cartId: number) => {
        this._cartService.cartId = cartId;
        this._cartService.isCartOpen = true;
        this._cartService.cartCreationDate = new Date();

        this.addProductToCart(productToAdd, quantityToAdd);
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
    }
  }

  checkIfProductExistsInCart(product: IProduct, quantity: number) {
    let isProductInCart = this._cartService.cartItems.find((item: { productId: number; }) => item.productId === product.id);

    if (isProductInCart) {
      this.updateCartQuantity(isProductInCart, quantity);
    } else {
      this.addProductToCart(product, quantity);
    }
  }

  addProductToCart(product: IProduct, quantity: number) {
    if (!product || !quantity || quantity < 1) {
      return;
    }
    let data = { productId: product.id, quantity };

    const addProductToCart = this._cartService.addProductToCart(data);
    addProductToCart.subscribe(() => {
      this._cartService.getCartItems(this._cartService.cartId);
      // this._cartService.cartTotalValue += product.price * quantity;
      this._cartService.cartTotalValue = this._cartService.calculateCartTotalValue();
      this.quantityToAdd = 1;

      this._popupRef.close(true);
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }

  updateCartQuantity(productToUpdate: ICartItem, quantityAdded: number) {
    if (!productToUpdate || !quantityAdded) {
      return;
    }

    let data = { productId: productToUpdate.productId, quantityAdded };

    const updateProductToCart = this._cartService.updateCartItemQuantity(data);
    updateProductToCart.subscribe(() => {
      this._cartService.getCartItems(this._cartService.cartId);
      // this._cartService.cartTotalValue += productToUpdate.price * quantityAdded;
      this._cartService.cartTotalValue = this._cartService.calculateCartTotalValue();
      this.quantityToAdd = 1;

      this._popupRef.close(true);
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }

  increaseQuantity() {
    this.quantityToAdd++;
  }

  decreaseQuantity() {
    if (this.quantityToAdd === 1) {
      return;
    }

    this.quantityToAdd--;
  }
}
