import { Component, Input, OnInit } from '@angular/core';
import { Product, Category } from '../shared/app.const';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
})
export class ProductComponent implements OnInit {

  @Input() product: Product | undefined;

  constructor() {}

  ngOnInit() {}

}
