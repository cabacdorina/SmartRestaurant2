import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-remove',
  templateUrl: './product-remove.component.html',
  styleUrls: ['./product-remove.component.css']
})
export class ProductRemoveComponent implements OnInit {
  prod: Product;
  constructor() { }

  ngOnInit() {
  }

  removeProduct(prod: Product) {

  }

}
