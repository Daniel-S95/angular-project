import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-general-stats-home',
  templateUrl: './general-stats-home.component.html',
  styleUrls: ['./general-stats-home.component.css'],
})
export class GeneralStatsHomeComponent implements OnInit {
  constructor(public _cartService: CartService, public _stateService: StateService, public _userService: UserService,
    public _orderService: OrderService, public _productService: ProductService, private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.getProductsStats();
  }

  getProductsStats() {
    const getGeneralStatsObservable = this._productService.getStats();
    getGeneralStatsObservable.subscribe((stats: { numberOfProducts: number, numberOfOrders: number }) => {
      this._productService.numberOfProducts = stats.numberOfProducts;
      this._orderService.numberOfOrders = stats.numberOfOrders;
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }

}
