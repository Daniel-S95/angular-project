import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: ICategory[] = [];
  selectedCategory = "";

  constructor(private _http: HttpClient, private _snackBarService: SnackBarService) { }

  public getAllCategories() {
    this._http.get("http://localhost:3001/api/categories")
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
      });
  }

  public resetToDefaultCategory() {
    this.selectedCategory = "All";
  }
}
