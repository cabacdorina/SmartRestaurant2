import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductManagementService {
  @Output() public addIngredient = new EventEmitter();
  @Output() public editIngredient = new EventEmitter();
  @Output() public viewIngredient = new EventEmitter();

  @Output() public addRecipeEmitter= new EventEmitter();
  @Output() public editRecipeEmitter = new EventEmitter();
  @Output() public viewRecipeEmitter = new EventEmitter();

  addIngredientFlag: boolean = false;
  editIngredientFlag: boolean = false;
  viewIngredientList: boolean = false;

  public addRecipeFlag: boolean = false;
  public editRecipeFlag: boolean = false;
  public viewRecipeList: boolean = false;


  constructor() {}

  onAddIngredinet(value: boolean) {
    this.resetAllFlags();
    this.addIngredientFlag = value;
    this.addIngredient.emit(this.addIngredientFlag);
  }

  onViewIngredient(value: boolean) {
    this.resetAllFlags();
    this.viewIngredientList = value;
    this.viewIngredient.emit(this.viewIngredientList);
  }

  onEditIngred(value: boolean) {
    this.resetAllFlags();
    this.editIngredientFlag = value;
    this.editIngredient.emit(this.editIngredientFlag);
  }

  onAddRecipe(value: boolean){
    this.resetAllFlags();
    this.addRecipeFlag=value;
    this.addRecipeEmitter.emit(this.addRecipeFlag);
  }

  onViewRecipe(value: boolean){
    this.resetAllFlags();
    this.viewRecipeList=value;
    this.viewRecipeEmitter.emit(this.viewRecipeList);
  }
  
  private resetAllFlags() {
    this.addIngredientFlag = false;
    this.editIngredientFlag = false;
    this.viewIngredientList = false;

    this.addRecipeFlag=false;
    this.editRecipeFlag=false;
    this.viewRecipeList=false;

    this.addRecipeEmitter.emit(false);
    this.editRecipeEmitter.emit(false);
    this.viewRecipeEmitter.emit(false);
    
    this.addIngredient.emit(false);
    this.viewIngredient.emit(false);
    this.editIngredient.emit(false);
  }
}
