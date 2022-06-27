import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-navigation',
  templateUrl: './categories-navigation.component.html',
  styleUrls: ['./categories-navigation.component.css']
})
export class CategoriesNavigationComponent implements OnInit {

  constructor(public _categoryService: CategoryService, public _productService: ProductService) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories();
    this._categoryService.resetToDefaultCategory();
  }

  onCategoryClick(category?: ICategory) {
    if (category) {
      this._productService.getProductsByCategoryId(category.id);
      this._categoryService.selectedCategory = category.categoryName;
    } else {
      this._productService.getAllProducts();
      this._categoryService.resetToDefaultCategory();
    }

    this._productService.searchString = '';
  }
}
