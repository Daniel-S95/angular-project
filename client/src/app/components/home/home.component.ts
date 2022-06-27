import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PageTitleService } from 'src/app/services/page-title.service';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  stats = null;

  constructor(public _stateService: StateService, public _productService: ProductService, public _cartService: CartService,
    private _titleService: PageTitleService) {
    this._titleService.setTitle('Your Fresh Choice!');
  }
}
