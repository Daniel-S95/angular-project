import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PageTitleService } from 'src/app/services/page-title.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems = this._cartService.cartItems;
  selectedDeliveryDate: Date = null;
  minDate = new Date();
  maxDate = new Date();

  receiptNumber: number = null;
  receiptInnerValue: string = null;

  isOrderSuccessful: boolean = false;

  searchInCartItems = "";

  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  cityFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  creditCardFormControl = new FormControl('', [Validators.required, Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]);

  constructor(public _cartService: CartService, public _userService: UserService, public _stateService: StateService,
    public _snackBarService: SnackBarService, public _orderService: OrderService, private _titleService: PageTitleService) { }

  ngOnInit(): void {
    this._cartService.getCartItems(this._cartService.cartId);
    this._orderService.getUnavailableDates();
    this.maxDate.setMonth(this.maxDate.getMonth() + 1);

    this._titleService.setTitle('Checkout');
  }

  removeCharsFromString() {
    const onlyNumbersInString = this.creditCardFormControl.value.replace(/\D/g, '');
    this.creditCardFormControl.setValue(onlyNumbersInString);
  }

  onCityDoubleClick() {
    this.cityFormControl.setValue(this._userService.userCity);
  }

  onStreetDoubleClick() {
    this.addressFormControl.setValue(this._userService.userStreetAddress);
  }

  calculateSumInObject(keyOfSum: string) {
    let cartItems = this._cartService.cartItems;
    let sum = null;

    if (keyOfSum === "orderSum") {
      sum = this._cartService.calculateCartTotalValue();
    }

    if (keyOfSum === "quantitySum") {
      sum = cartItems.reduce((totalQuantity: number, obj: { quantity: number }) => obj.quantity + totalQuantity, 0);
    }

    return sum;
  }

  formatDate(date: Date, dateTypeOrder?: number) {
    if (!date) {
      return null;
    }

    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    if (dateTypeOrder === 1) {
      return [day, month, year].join('/');
    }

    return [year, month, day].join('-');
  }

  onSubmitOrder() {
    let invalidForm = !this.cityFormControl.value || this.cityFormControl.value.trim().length < 3 || this.cityFormControl.value.length > 45 ||
      !this.addressFormControl.value || this.addressFormControl.value.trim().length < 3 || this.addressFormControl.value.length > 100 ||
      !this.creditCardFormControl.value || this.creditCardFormControl.value.trim().length < 12 || this.creditCardFormControl.value.length > 16 ||
      this.cityFormControl.invalid || this.addressFormControl.invalid || this.creditCardFormControl.invalid || !this.selectedDeliveryDate;

    if (invalidForm) {
      this._snackBarService.openSnackBar('Please fill the form correctly', '', 'error-snackbar');
      return;
    }

    let orderData = {
      customerId: this._stateService.userId,
      cartId: this._cartService.cartId,
      city: this.cityFormControl.value,
      streetAddress: this.addressFormControl.value,
      deliveryDate: this.formatDate(this.selectedDeliveryDate),
      creditCard: this.creditCardFormControl.value.toString().slice(-4)
    };

    const createOrder = this._orderService.createOrder(orderData);
    createOrder.subscribe(() => {
      this.receiptNumber = Math.floor(Math.random() * 999999999999999 + 100000);
      this.receiptInnerValue = this.generateReceiptText(this.receiptNumber);

      this.deleteUserCart();
      this._userService.getUserData();
      this.isOrderSuccessful = true;
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }

  unavailableDatesFilter = (d: Date): boolean => {
    const time = new Date(d).getTime();
    return !this._orderService.unavailableDates.find(x => x.getTime() == time);
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

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      for (let date of this._orderService.unavailableDates) {
        if (cellDate.toLocaleDateString() === date.toLocaleDateString()) {
          return 'unavailable-date';
        }
      }
    }
    return '';
  };

  addDecimals(number: number) {
    return number % 1 === 0 ? number : number.toFixed(2);
  }

  generateReceiptText(receiptNumber: number) {
    let divider = '\n-----------------------------------\n\n';
    let receiptInnerText = `Receipt #${receiptNumber}:\n${divider}`;

    for (let cartItem of this._cartService.cartItems) {
      receiptInnerText += `${cartItem.quantity}x ${cartItem.name}
      Total Price: $${this.addDecimals(cartItem.totalPrice)}\n\n`;
    }

    receiptInnerText += `${divider}Order Total:		$${this.addDecimals(this.calculateSumInObject("orderSum"))}\n`;
    receiptInnerText += `Order Date:			${this.formatDate(new Date(), 1)}\n`;
    receiptInnerText += `Order Lines:		${this._cartService.cartItems.length}\n`;
    receiptInnerText += `Order Products:		${this.calculateSumInObject("quantitySum")}`;

    receiptInnerText += `\n${divider}Thanks for shopping with us!\nHope to see you again soon!`;

    return receiptInnerText;
  }

  onDownloadReceipt() {
    if (!this.receiptNumber || !this.receiptInnerValue) {
      return;
    }

    let file = new Blob([this.receiptInnerValue], { type: '.txt' });
    let a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = this.receiptNumber.toString();
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
