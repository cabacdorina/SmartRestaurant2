import { Injectable, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  @Output() addIngredient = new EventEmitter();

  addIngredientFlag: boolean;
  constructor() { }

  onAddIngredinet() {
    //this.addIngredient.emit(this.addIngredientFlag);
  }
}
