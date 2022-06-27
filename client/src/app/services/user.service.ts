import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UserEmailAndIdNumber from '../models/UserEmailAndIdNumber';
import UserRegistrationData from '../models/UserRegistrationData';
import UserLoginData from '../models/UserLoginData';
import { SnackBarService } from './snack-bar.service';
import { StateService } from './state.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userStreetAddress: string = null;
  public userCity: string = null;

  constructor(private _http: HttpClient, private _snackBarService: SnackBarService, private _stateService: StateService,
    private _cartService: CartService, private _orderService: OrderService) { }

  public emailAndIdNumberUnique(userEmailAndIdNumber: UserEmailAndIdNumber) {
    return this._http.post("http://localhost:3001/api/users", userEmailAndIdNumber);
  }

  public register(userRegistrationData: UserRegistrationData) {
    return this._http.post("http://localhost:3001/api/users", userRegistrationData);
  }

  public login(UserLoginData: UserLoginData) {
    return this._http.post("http://localhost:3001/api/users/login", UserLoginData);
  }

  public getUserData() {
    let userId = this._stateService.userId;
    this._http.get(`http://localhost:3001/api/users/${userId}`)
      .subscribe((data: { streetAddress: string, city: string, cartId: number, cartCreationDate: Date, cartTotalValue: number, orderId: number, orderDate: Date }) => {
        let { streetAddress, city, cartId, cartCreationDate, cartTotalValue, orderId, orderDate } = data;

        this.userStreetAddress = streetAddress;
        this.userCity = city;

        this._cartService.isCartOpen = cartId ? true : false;
        this._cartService.cartId = cartId;
        this._cartService.cartCreationDate = cartCreationDate;
        this._cartService.getCartItems(cartId);

        this._orderService.lastOrderId = orderId;
        this._orderService.lastOrderDate = orderDate;
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
  }
}
