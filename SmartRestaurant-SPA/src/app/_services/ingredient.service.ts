import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../_models/ingredient";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  baseUrl = environment.apiUrl;

  readonly ingredientPerUnitUrl = this.baseUrl + "ingredientPerUnit";
  readonly ingredientPerPieceUrl = this.baseUrl + "ingredientPerPiece";

  constructor(private http: HttpClient) {}

  getIngredientsPerPiece(): Observable<Object> {
    return this.http.get(this.ingredientPerPieceUrl + "/GetAllIngred");
  }

  getIngredientsPerUnit(): Observable<Object> {
    return this.http.get(this.ingredientPerUnitUrl + "/GetAllIngred");
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

  removeIngredientPerPiece(ingredient: Ingredient) {
    this.http.delete(this.ingredientPerPieceUrl + "/DeleteIngred" + ingredient.id);
  }

  removeIngredientPerUnit(ingredient: Ingredient) {
    this.http.delete(this.ingredientPerUnitUrl + "/DeleteIngred" + ingredient.id);
  }

  resetProdArray() {}
}
