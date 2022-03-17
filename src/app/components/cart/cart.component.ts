import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from 'src/app/services/cart.service';
import { ProductInterface } from 'src/app/types/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  faTrash = faTrash;

  public products$!: Observable<ProductInterface[]>;
  public totalPrice$!: Observable<number>;
  public noProductsInCart$!: Observable<boolean>;

  constructor(private cartService: CartService) {
    this.products$ = this.cartService.cartItemList$;

    this.noProductsInCart$ = this.products$.pipe(
      map((products) => products.length === 0)
    );

    this.totalPrice$ = this.cartService.cartItemList$.pipe(
      map((products) => {
        let totalPrice: number = 0;

        products.map((product) => {
          totalPrice += product.price;
        });

        return totalPrice;
      })
    );
  }

  ngOnInit(): void {}

  removeCart(id: number): void {
    this.cartService.removeCartItem(id);
  }

  removeAllCart(): void {
    this.cartService.removeAllCart();
  }
}
