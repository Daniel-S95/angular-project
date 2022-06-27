import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PageTitleService } from 'src/app/services/page-title.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-users-shop',
  templateUrl: './users-shop.component.html',
  styleUrls: ['./users-shop.component.css']
})
export class UsersShopComponent implements OnInit {
  isCartSideNavOpen: boolean = true;
  productsElementHeight = null;

  constructor(public _productService: ProductService, public _cartService: CartService, private _orderService: OrderService,
    private _snackBarService: SnackBarService, private _titleService: PageTitleService) { }

  ngOnInit(): void {
    this._productService.getAllProducts();
    this.calculateProductsContainerHeight();

    this._titleService.setTitle('Shop');
  }

  calculateProductsContainerHeight() {
    const rightEl = document.getElementById('shopContainer');

    setTimeout(() => {
      let screenHeight = window.screen.height;
      let shopContainerHeight = rightEl.clientHeight + 14;

      if (screenHeight > (shopContainerHeight + 64)) {
        this.productsElementHeight = window.screen.height;
      } else {
        this.productsElementHeight = shopContainerHeight;
      }
    }, 600);
  }

  updateCartSideNavState() {
    this.isCartSideNavOpen = !this.isCartSideNavOpen;
  }

  calculateOrderTotal() {
    let cartItems = this._cartService.cartItems;
    return cartItems.reduce((totalOrderValue: number, obj: { totalPrice: number }) => obj.totalPrice + totalOrderValue, 0);
  }

  deleteUserCart() {
    const deleteCart = this._cartService.deleteCart(this._cartService.cartId);
    deleteCart.subscribe(() => {
      this._cartService.isCartOpen = false;
      this._cartService.cartId = null;
      this._cartService.cartCreationDate = null;
      this._cartService.cartTotalValue = null;
      this._cartService.cartItems = [];

      this._orderService.lastOrderDate = new Date();
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }
}
