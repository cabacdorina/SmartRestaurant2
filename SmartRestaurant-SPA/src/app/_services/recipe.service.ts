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

  addRecipeFlag: boolean = false;
  editRecipeFlag: boolean = false;
  viewRecipeList: boolean = false;

  constructor(private http: HttpClient) {}

  addRecipe(recipe: Recipe): Observable<Object> {
    return this.http.post(this.recipeUrl + "/AddRecipe", recipe);
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
