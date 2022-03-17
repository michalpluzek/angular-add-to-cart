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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.totalProducts$ = this.cartService.cartItemList$.pipe(
      map((products) => products.length)
    );
  }
}
