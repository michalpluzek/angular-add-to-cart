import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductInterface } from 'src/app/types/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList$!: Observable<ProductInterface[]>;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.productList$ = this.apiService.getProducts().pipe(
      map((products) => {
        products.forEach((product) => {
          Object.assign(product, { quantity: 1, total: product.price });
        });
        return products;
      })
    );
  }

  ngOnInit(): void {}

  addToCart(product: ProductInterface): void {
    this.cartService.addToCart(product);
  }
}
