import { Component } from '@angular/core';

@Component({
  selector: 'app-why-from-us',
  templateUrl: './why-from-us.component.html',
  styleUrls: ['./why-from-us.component.css']
})
export class WhyFromUsComponent {

  reasonsToBuy = ['We are fully committed to provide our customers with the very best products and customer service.',
    'We guarantee you will be satisfied with our products!',
    'Lowest pricing available online.',
    'We ship most orders within 1 business day from our large warehouses.'];

  constructor() { }
}
