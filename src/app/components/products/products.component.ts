import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { ProductInterface } from 'src/app/types/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList$!: Observable<ProductInterface[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.productList$ = this.apiService.getProducts();
  }
}
