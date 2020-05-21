import { Injectable, Output, EventEmitter } from "@angular/core";
import { t } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root",
})
export class ProductManagementService {
  @Output() public addIngredient = new EventEmitter();
  @Output() public editIngredient = new EventEmitter();
  @Output() public viewIngredient = new EventEmitter();

  @Output() public addRecipeEmitter= new EventEmitter();
  @Output() public editRecipeEmitter = new EventEmitter();
  @Output() public viewRecipeListEmitter = new EventEmitter();

  @Output() public viewRecipeEmitter = new EventEmitter();

  @Output() public addProductEmitter = new EventEmitter();
  @Output() public viewProductListEmitter = new EventEmitter();

  public addIngredientFlag: boolean = false;
  public editIngredientFlag: boolean = false;
  public viewIngredientList: boolean = false;

  public addRecipeFlag: boolean = false;
  public viewRecipeListFlag: boolean = false;
  
  public viewRecipeFlag : boolean = false;
  public editRecipeFlag: boolean = false;

  public addProductFlag:boolean = false;
  public viewProductListFlag: boolean = false;

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

  onViewListRecipe(value: boolean){
    this.resetAllFlags();
    this.viewRecipeListFlag=value;
    this.viewRecipeListEmitter.emit(this.viewRecipeListFlag);
  }

  onViewRecipe(value: boolean){
    this.resetAllFlags();
    this.viewRecipeFlag=value;
    this.viewRecipeEmitter.emit(this.viewRecipeFlag);
  }  

  onEditRecipe(value:boolean){
    this.resetAllFlags();
    this.editRecipeFlag=value;
    this.editRecipeEmitter.emit(this.editRecipeFlag);
  }

  // onViewAddComponent
  onAddProduct(value: boolean){
    this.resetAllFlags();
    this.addProductFlag=value;
    this.addProductEmitter.emit(this.addProductFlag);
  }

  onViewProductList(value: boolean){
    this.resetAllFlags();
    this.viewProductListFlag = value;
    this.viewProductListEmitter.emit(this.viewProductListFlag);
  }
  
  private resetAllFlags() {
    this.addIngredientFlag = false;
    this.editIngredientFlag = false;
    this.viewIngredientList = false;

    this.addRecipeFlag=false;
    this.editRecipeFlag=false;
    this.viewRecipeListFlag=false;

    this.viewRecipeFlag = false;

    this.addProductFlag = false;

    this.addRecipeEmitter.emit(false);
    this.editRecipeEmitter.emit(false);
    this.viewRecipeListEmitter.emit(false);
    
    this.addIngredient.emit(false);
    this.viewIngredient.emit(false);
    this.editIngredient.emit(false);

    this.viewRecipeEmitter.emit(false);
    
    this.addProductEmitter.emit(false);
    this.viewProductListEmitter.emit(false);
  }
}
