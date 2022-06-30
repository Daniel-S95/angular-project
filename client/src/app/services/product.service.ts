import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[] = [];
  searchString: string | any = '';
  numberOfProducts: number = null;

  constructor(private _http: HttpClient, private _snackBarService: SnackBarService) { }

  public getAllProducts() {
    this._http.get('http://localhost:3001/api/products')
      .subscribe((products: IProduct[]) => {
        this.products = products;
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
  }

  public updateProduct(newProductData: IProduct) {
    return this._http.put(`http://localhost:3001/api/products/${newProductData.id}`, newProductData);
  }

  public getProductsBySubstring(substring: string) {
    return this._http.get(`http://localhost:3001/api/products/search/${substring}`);
  }

  public addProduct(newProductData: IProduct) {
    return this._http.post('http://localhost:3001/api/products', newProductData);
  }

  public getStats() {
    return this._http.get('http://localhost:3001/api/products/stats');
  }

  public getProductsByCategoryId(categoryId: number) {
    this._http.get(`http://localhost:3001/api/products/category/${categoryId}`)
      .subscribe((products: IProduct[]) => {
        this.products = products;
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
  }
}
