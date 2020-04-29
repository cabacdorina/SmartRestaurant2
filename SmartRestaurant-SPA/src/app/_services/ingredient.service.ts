import { Injectable, EventEmitter, Output } from "@angular/core";
import { Ingredient } from "../_models/ingredient";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  @Output() public editIngred = new EventEmitter();
  public ingredientsPerPiece: Ingredient[] = [];
  public ingredientsPerUnit: Ingredient[] = [];

  baseUrl = environment.apiUrl;

  readonly ingredientPerUnitUrl = this.baseUrl + "ingredientPerUnit";
  readonly ingredientPerPieceUrl = this.baseUrl + "ingredientPerPiece";

  constructor(private http: HttpClient) {}

  getIngredientsPerPiece(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientPerPieceUrl + "/GetAllIngred");
  }

  getIngredientsPerUnit(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientPerUnitUrl + "/GetAllIngred");
  }

  addIngredient(ingredient: Ingredient, type: string): Observable<Object> {
    console.log("service: " + ingredient.name);
    if (type === "Liter" || type === "Gram") {
      ingredient.unitType = type == "Gram" ? 0 : 1;
      return this.http.post<Ingredient>(
        this.ingredientPerUnitUrl + "/AddIngred",
        ingredient
      );
    }
    if (type === "Pieces") {
      return this.http.post<Ingredient>(
        this.ingredientPerPieceUrl + "/AddIngred",
        ingredient
      );
    }
  }

  editIngredient(ingredient: Ingredient, type: string): Observable<Object> {
    console.log("service: " + ingredient.name);
    if (type === "Liter" || type === "Gram") {
      ingredient.unitType = type == "Gram" ? 0 : 1;
      return this.http.put<Ingredient>(
        this.ingredientPerUnitUrl + "/UpdateIngred/"+ingredient.id, ingredient
      );
    }
    if (type === "Pieces") {
      return this.http.put<Ingredient>(
        this.ingredientPerPieceUrl + "/UpdateIngred/"+ingredient.id, ingredient
      );
    }
  }
  removeIngredientPerPiece(ingredient: Ingredient) {
    return this.http.delete(this.ingredientPerPieceUrl + "/DeleteIngred/" + ingredient.id);
  }

  removeIngredientPerUnit(ingredient: Ingredient) {
    return this.http.delete(this.ingredientPerUnitUrl + "/DeleteIngred/" + ingredient.id);
  }

  editIngredElement(ingred: Ingredient, i: number) {
    this.editIngred.emit({ingred: ingred, index: i});
  }
  
  replaceOldIngred(oldType: string, editedIngred: Ingredient){
    if(oldType==='Pieces'){
      this.replaceElementInList(this.ingredientsPerPiece, editedIngred);
    }

    if(oldType==='Gram'|| oldType==='Liter'){
      this.replaceElementInList(this.ingredientsPerUnit,  editedIngred);
    }
  }

  replaceElementInList(ingredList: Array<Ingredient>,  editedIngred: Ingredient){
    for ( let i = 0 ; i < ingredList.length; ++i) {
      if(ingredList[i].id=== editedIngred.id){
        ingredList[i] = editedIngred;
        break;
      }
    }
  }
  resetProdArray() {}

}
