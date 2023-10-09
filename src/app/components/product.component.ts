import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/app.const';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [IonCard, IonCardHeader, IonCardTitle, IonCardContent],
  standalone: true,
  styles: [
    `
      .card {
        border: 1px solid #ddd;
        padding: 16px;
        border-radius: 8px;
        margin: 16px 0;
      }
      .card-header {
        h2,
        h3 {
          margin: 0;
        }
      }
    `,
  ],
})
export class ProductComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor() {}

  ngOnInit() {}
}
