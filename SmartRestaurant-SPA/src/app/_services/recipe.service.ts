import { Injectable, Output, EventEmitter } from "@angular/core";
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

  @Output() public addRecipeEmitter= new EventEmitter();
  @Output() public editRecipeEmitter = new EventEmitter();
  @Output() public viewRecipeEmitter = new EventEmitter();

  public addRecipeFlag: boolean = false;
  public editRecipeFlag: boolean = false;
  public viewRecipeList: boolean = false;

  public recipeList: Recipe[];

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipe): Observable<Object> {
    return this.http.post(this.recipeUrl + "/AddRecipe", recipe);
  }

  getRecipeList(): Observable<Recipe[]>{
    let recipeUrl = this.baseUrl+"recipe/GetAllRecipes";
    return this.http.get<Recipe[]>(recipeUrl)
  }

  private resetAllFlags() {
    this.addRecipeFlag=false;
    this.editRecipeFlag=false;
    this.viewRecipeList=false;

    this.addRecipeEmitter.emit(false);
    this.editRecipeEmitter.emit(false);
    this.viewRecipeEmitter.emit(false);
  }

  onAddRecipe(value: boolean){
    this.resetAllFlags();
    this.addRecipeFlag=value;
    this.addRecipeEmitter.emit(this.addRecipeFlag);
  }
}
