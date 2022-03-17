import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import {
  faShippingFast,
  faSearch,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  faShippingFast = faShippingFast;
  faSearch = faSearch;
  faCartPlus = faCartPlus;

  public totalProducts$!: Observable<number>;

  constructor(private cartService: CartService) {
    this.totalProducts$ = this.cartService.cartItemList$.pipe(
      map((products) => {
        let total = 0;

        products.map((product) => {
          if (product.quantity) {
            total += product.quantity;
          }
        });
        return total;
      })
    );
  }

  ngOnInit(): void {}
}
