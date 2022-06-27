import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IProduct } from 'src/app/models/IProduct';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent {
  @Input() productDataForEdit: IProduct;
  @Output() isSuccessful = new EventEmitter<boolean>();

  productNameFormControl = new FormControl();
  productPriceFormControl = new FormControl();
  productImageFormControl = new FormControl();
  selectedCategoryForEdit = null;
  productData = null;

  constructor(private _snackBarService: SnackBarService, private _productService: ProductService,
    public _categoryService: CategoryService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.productData = changes['productDataForEdit'].currentValue;

    this.productNameFormControl = new FormControl(this.productData.name, [Validators.required, Validators.minLength(3)]);
    this.productPriceFormControl = new FormControl(this.productData.price, [Validators.required, Validators.min(1), Validators.max(9999)]);
    this.productImageFormControl = new FormControl(this.productData.imageURL, [Validators.required, Validators.minLength(5)]);
    this.selectedCategoryForEdit = this.productData.categoryName;
  }

  onCategorySelect(event: Event) {
    this.selectedCategoryForEdit = (event.target as HTMLSelectElement).value;
  }

  editProductForm(product: IProduct) {
    this.productData = product;
    this.clearForm(product);
  }

  newProductDrawer() {
    let firstCategoryName = this._categoryService.categories[0].categoryName;

    this.productData = { id: null, name: '', categoryName: firstCategoryName, price: null, imageURL: '' };
    this.clearForm();
  }

  clearForm(product?: IProduct) {
    this.productNameFormControl.setValue(product ? product.name : null);
    this.productNameFormControl.setErrors(null);

    this.productPriceFormControl.setValue(product ? product.price : null);
    this.productPriceFormControl.setErrors(null);

    this.productImageFormControl.setValue(product ? product.imageURL : null);
    this.productImageFormControl.setErrors(null);

    this.selectedCategoryForEdit = product ? product.categoryName : null;
  }

  isFormValid(productName: string, productPrice: number, productImage: string) {
    let invalidProductData = !productName || !productPrice || !productImage;

    if (invalidProductData) {
      this._snackBarService.openSnackBar('All fields must be filled', '', 'error-snackbar');
      return false;
    }

    if (productName.trim().length < 3 || productName.length > 30) {
      this._snackBarService.openSnackBar('Name must be between 3-30 characters long', '', 'error-snackbar');
      return false;
    }

    if (productPrice < 1 || productPrice > 9999) {
      this._snackBarService.openSnackBar("Price must be between $1 - $9,999", '', 'error-snackbar');
      return false;
    }

    if (productImage.trim().length < 5 || productImage.length > 250) {
      this._snackBarService.openSnackBar('Image URL must be between 3-30 characters long', '', 'error-snackbar');
      return false;
    }

    return true;
  }

  convertCategoryNameToId(categoryName: string) {
    let categoryId = this._categoryService.categories.find((o) => o.categoryName === categoryName).id;
    return categoryId;
  }

  closeForm() {
    this.isSuccessful.emit(true);
  }

  addProduct(newProductName: string, newProductCategory: string, newProductPrice: number, newProductImage: string) {
    if (!this.isFormValid(newProductName, newProductPrice, newProductImage)) {
      return;
    }

    let firstCategoryName = this._categoryService.categories[0].categoryName;

    if (newProductCategory === null) {
      newProductCategory = firstCategoryName;
    }

    let newProductCategoryId = this.convertCategoryNameToId(newProductCategory);

    let newProductData = {
      name: newProductName.trim(),
      categoryId: newProductCategoryId,
      categoryName: newProductCategory,
      price: newProductPrice,
      imageURL: newProductImage.trim(),
    };

    const addProductsObservable = this._productService.addProduct(newProductData);
    addProductsObservable.subscribe(() => {
      this._snackBarService.openSnackBar('Product has been successfully added!', '', 'success-snackbar');
      this.isSuccessful.emit(true);
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }

  updateProduct(productId: number, newProductName: string, newProductCategory: string, newProductPrice: number, newProductImage: string) {
    if (!this.isFormValid(newProductName, newProductPrice, newProductImage)) {
      return;
    }

    let newProductCategoryId = this.convertCategoryNameToId(newProductCategory);

    let newProductData = {
      id: productId,
      name: newProductName.trim(),
      categoryId: newProductCategoryId,
      categoryName: newProductCategory,
      price: newProductPrice,
      imageURL: newProductImage.trim(),
    };

    const updateProductsObservable = this._productService.updateProduct(newProductData);
    updateProductsObservable.subscribe(() => {
      this._snackBarService.openSnackBar('Product has been successfully edited!', '', 'success-snackbar');
      this.isSuccessful.emit(true);
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, '', 'error-snackbar');
    });
  }
}
