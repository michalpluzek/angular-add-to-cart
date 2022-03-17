import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProductInterface } from 'src/app/types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: ProductInterface[] = [];
  public productList$ = new BehaviorSubject<ProductInterface[]>([]);

  constructor() {}

  getProducts(): Observable<ProductInterface[]> {
    return this.productList$.asObservable();
  }

  setProducts(products: ProductInterface[]): void {
    this.cartItemList.push(...products);
    this.productList$.next(products);
  }

  addToCart(product: ProductInterface): void {
    this.cartItemList.push(product);
    this.productList$.next(this.cartItemList);
    this.getTotalPrice();

    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItemList.map((item) => {
      totalPrice += item.price;
    });

    return totalPrice;
  }

  removeCartItem(product: ProductInterface): void {
    this.cartItemList.map((item, index) => {
      if (product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });

    this.productList$.next(this.cartItemList);
  }

  removeAllCart(): void {
    this.cartItemList = [];
    this.productList$.next(this.cartItemList);
  }
}
