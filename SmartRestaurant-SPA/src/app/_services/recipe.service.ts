import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../_models/recipe";
import { Observable } from "rxjs";
import { RecipeByNameDetails } from "../_models/RecipeByNameDetails";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  @Output() public recipeEmitter = new EventEmitter();

  baseUrl = environment.apiUrl;
  readonly recipeUrl = this.baseUrl + "recipe"; 
  public recipeList: Recipe[] = [];

  constructor(private http: HttpClient) {
  }

  addRecipe(recipe: Recipe): Observable<Object> {
    return this.http.post(this.recipeUrl + "/AddRecipe", recipe);
  }

  getRecipeList(): Observable<Recipe[]>{
    let recipeUrl = this.baseUrl+"recipe/GetAllRecipes";
    return this.http.get<Recipe[]>(recipeUrl)
  }

  getRecipeByName(name:string):Observable<RecipeByNameDetails>{
    let recipeUrl= this.baseUrl+"recipe/GetRecipeByName/"+name; 
    return this.http.get<RecipeByNameDetails>(recipeUrl);
  }
  
  onRemoveSelected(name:string):Observable<any>{
    let recipeUrl=this.baseUrl+"recipe/DeleteRecipeByName/"+name;
    return this.http.delete<any>(recipeUrl);
  }

  onRecipeSelected(recipe: Recipe, i: number){
    this.recipeEmitter.emit({recipe:recipe,index: i});
  }

  
}
