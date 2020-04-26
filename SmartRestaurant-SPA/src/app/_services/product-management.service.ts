import { Injectable, Output ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  @Output() public addIngredient = new EventEmitter();
  @Output() public editIngredient = new EventEmitter();
  @Output() public viewIngredient = new EventEmitter();

  addIngredientFlag: boolean = false;
  editIngredientFlag: boolean = false;
  viewIngredientList: boolean = false;  
  
  constructor() { }

  onAddIngredinet(value: boolean) {
    this.resetAllFlags();
    this.addIngredientFlag = value;
    this.addIngredient.emit(this.addIngredientFlag);
  }

  onViewIngredient(value:boolean){
    this.resetAllFlags();
    this.viewIngredientList=value;
    this.viewIngredient.emit(this.viewIngredientList);
  }

  private resetAllFlags() {
    this.addIngredientFlag = false;
    this.editIngredientFlag = false;
    this.viewIngredientList = false;  

    this.addIngredient.emit(false);
    this.viewIngredient.emit(false);
    this.editIngredient.emit(false);
  }
}
