import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ProductComponent } from '../components/product.component';
import { NgForOf, AsyncPipe  } from '@angular/common';
import {
  Observable,
  BehaviorSubject,
  map,
  combineLatest,
  startWith,
} from 'rxjs';
import { Product, Category } from '../shared/app.const';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ProductComponent, NgForOf, AsyncPipe ],
})
export class HomePage implements OnInit {

  searchTerm = new BehaviorSubject<string>('');
  selectedCategory = new BehaviorSubject<string | null>(null);
  isAvailable = new BehaviorSubject<boolean | null>(null);
  products$: Observable<Product[]> | undefined;
  categories$: Observable<Category[]> = this.categoryService.get();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.productService.get(),
      this.searchTerm.pipe(startWith('')),
      this.selectedCategory.pipe(startWith(null)),
      this.isAvailable.pipe(startWith(null)),
    ]).pipe(
      map(([products, search, category, available]) => {
        return products.filter((p: Product) => {
          return (
            (p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.description.toLowerCase().includes(search.toLowerCase())) &&
            (category ? p.category.name === category : true) &&
            (available !== null ? p.isAvailable === available : true)
          );
        });
      })
    );

  }

  onSearchChange(search: Event) {
    //@ts-ignore
    this.searchTerm.next(search.detail.value);
  }

  onCategoryChange(event: Event) {
    //@ts-ignore
    this.selectedCategory.next(event.detail.value);
  }

  onAvailabilityChange(available: Event) {
    //@ts-ignore
    this.isAvailable.next(available.detail.checked);
  }
}
