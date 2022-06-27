import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/IProduct';
import { StateService } from 'src/app/services/state.service';
import { ProductPopupComponent } from '../product-popup/product-popup.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: IProduct;
  @Output() productForEdit = new EventEmitter<IProduct>();

  isUser = this._stateService.userType === "USER" ? true : false;

  constructor(public _stateService: StateService, private _popupDialog: MatDialog) { }

  onProductClick() {
    if (this.isUser) {
      this.openDialog();
    } else {
      this.productForEdit.emit(this.product);
    }
  }

  openDialog() {
    this._popupDialog.open(ProductPopupComponent, { data: this.product });
  }
}
