import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProductInterface } from 'src/app/types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList$ = new BehaviorSubject<ProductInterface[]>([]);

  constructor() {}

  setProducts(products: ProductInterface[]): void {
    this.cartItemList$.next(products);
  }

  addToCart(product: ProductInterface): void {
    let updatedCartList: ProductInterface[] = [];
    const index = this.cartItemList$.getValue().indexOf(product);

    if (index >= 0) {
      const updatedCart = this.cartItemList$.getValue()[index];
      if (updatedCart.quantity) {
        updatedCart.quantity++;
        updatedCart.total = updatedCart.quantity * updatedCart.price;
      }

      updatedCartList = [...this.cartItemList$.getValue()];
    } else {
      updatedCartList = [...this.cartItemList$.getValue(), product];
    }

    this.cartItemList$.next(updatedCartList);
  }

  removeCartItem(id: number): void {
    const updatedCartList = this.cartItemList$
      .getValue()
      .filter((product) => product.id !== id);

    this.cartItemList$.next(updatedCartList);
  }

  removeAllCart(): void {
    this.cartItemList$.next([]);
  }
}
