import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../models/IOrder';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public unavailableDates: Date[] = [];
  public lastOrderId: number = null;
  public lastOrderDate: Date = null;
  public numberOfOrders: number = null;

  constructor(private _http: HttpClient, private _snackBarService: SnackBarService) { }

  public getUnavailableDates() {
    this._http.get('http://localhost:3001/api/orders/unavailable-dates')
      .subscribe((dates) => {
        this.unavailableDates = Object.keys(dates).map(val => new Date(dates[val].deliveryDate));
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
  }

  public createOrder(orderData: IOrder) {
    return this._http.post('http://localhost:3001/api/orders', orderData);
  }
}
