import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../_models/recipe";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  @Output() public recipeEmitter = new EventEmitter();

  baseUrl = environment.apiUrl;
  readonly recipeUrl = this.baseUrl + "recipe"; 
  public recipeList: Recipe[];

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipe): Observable<Object> {
    return this.http.post(this.recipeUrl + "/AddRecipe", recipe);
  }

  getRecipeList(): Observable<Recipe[]>{
    let recipeUrl = this.baseUrl+"recipe/GetAllRecipes";
    return this.http.get<Recipe[]>(recipeUrl)
  }
  
  onRecipeSelected(recipe: Recipe, i: number){
    this.recipeEmitter.emit({recipe:recipe,index: i});
  }
}
