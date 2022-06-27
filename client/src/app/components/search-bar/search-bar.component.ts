import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from 'src/app/models/IProduct';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() cartSideNavClicked = new EventEmitter<boolean>();

  constructor(public _productService: ProductService, private _snackBarService: SnackBarService, public _cartService: CartService,
    private _categoryService: CategoryService) { }

  ngOnInit() {
    this._productService.searchString = '';
  }

  valueChange(newValue: string) {
    this._productService.searchString = newValue.trim();

    if (this._productService.searchString.length === 0) {
      this._productService.getAllProducts();
      return;
    }

    this._productService.searchString = newValue;

    const getProductsBySubstring = this._productService.getProductsBySubstring(this._productService.searchString);
    getProductsBySubstring.subscribe((products: IProduct[]) => {
      this._categoryService.resetToDefaultCategory();
      this._productService.products = products;
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, "", "error-snackbar");
    });
  }
}
