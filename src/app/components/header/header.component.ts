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

  constructor() {}

  ngOnInit(): void {}
}
