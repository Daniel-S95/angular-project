import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  productToEdit: IProduct;

  isProductEdited = false;

  constructor(public _productService: ProductService, public _categoryService: CategoryService, public _orderService: OrderService,
    private _titleService: PageTitleService) { }

  ngOnInit(): void {
    this._productService.getAllProducts();
    this._titleService.setTitle('Admin Panel');
  }

  openEditDrawer(product: IProduct) {
    this.isProductEdited = true;
    this.productToEdit = product;
  }

  closeEditDrawer() {
    this.isProductEdited = false;
    this.productToEdit = null;
    this._productService.getAllProducts();
  }
}
