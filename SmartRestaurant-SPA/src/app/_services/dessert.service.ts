import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class DessertService {
  prods: Product[] = [];

  constructor() { }

  getDesserts () {
    return this.prods;
  }

  addProducts(prod: Product) {
    console.log('service: ' + prod.name);
    this.prods.push(prod);
  }

  removeProducts(prod: Product) {
    this.prods = this.prods.filter( it => it !== prod);
  }

  resetProdArray() {
    this.prods = [];
  }
}
