import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../_models/recipe";
import { Observable } from "rxjs";
import { RecipeByNameDetails } from "../_models/RecipeByNameDetails";
import { t } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  @Output() public recipeEmitter = new EventEmitter();
  @Output() public editRecipeEmitter = new EventEmitter();

  baseUrl = environment.apiUrl;
  readonly recipeUrl = this.baseUrl + "recipe/"; 
  public recipeList: Recipe[] = [];

  constructor(private http: HttpClient) {
  }

  addRecipe(recipe: Recipe): Observable<Object> {
    return this.http.post(this.recipeUrl + "AddRecipe", recipe);
  }

  editRecipe(recipe:Recipe, name: string):Observable<Object>{
    return this.http.put(this.recipeUrl+"UpdateRecipeByName/"+name,recipe);
  }

  getRecipeList(): Observable<Recipe[]>{
    let recipeUrl = this.recipeUrl+"GetAllRecipes";
    return this.http.get<Recipe[]>(recipeUrl)
  }

  getRecipeByName(name:string):Observable<RecipeByNameDetails>{
    let recipeUrl= this.recipeUrl+"GetRecipeByName/"+name; 
    return this.http.get<RecipeByNameDetails>(recipeUrl);
  }
  
  onRemoveSelected(name:string):Observable<any>{
    let recipeUrl=this.recipeUrl+"DeleteRecipeByName/"+name;
    return this.http.delete<any>(recipeUrl);
  }

  onRecipeSelected(recipe: Recipe, i: number){
    this.recipeEmitter.emit({recipe:recipe,index: i});
  }

  onEditRecipe(recipe: Recipe){
    this.editRecipeEmitter.emit(recipe);
  }  
}
