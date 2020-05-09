import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../_models/recipe";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  baseUrl = environment.apiUrl;

  readonly recipeUrl = this.baseUrl + "recipe";

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipe): Observable<Object> {
    return this.http.post(this.recipeUrl + "/AddRecipe", recipe);
  }
}
