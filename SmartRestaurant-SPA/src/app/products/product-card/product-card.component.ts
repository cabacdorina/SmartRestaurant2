import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { fn } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() prod: Product;
  @Output() itemSelected = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  AddToArray() {
    this.itemSelected.emit(this.prod);
  }
}
