import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent {

  @Input() products: IProduct[] = [];
  @Output() productForEdit = new EventEmitter<IProduct>();

  constructor(public _productService: ProductService) { }

  onProductClick(product: IProduct) {
    this.productForEdit.emit(product);
  }
}
