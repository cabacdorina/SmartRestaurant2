import { Component, OnInit } from "@angular/core";
import { ProductManagementService } from "../_services/product-management.service";
import { IngredientService } from "../_services/ingredient.service";
import { Ingredient } from "../_models/ingredient";
import { RecipeService } from "../_services/recipe.service";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.css"],
})
export class ProductManagementComponent implements OnInit {
  public addIngredientFlag: boolean = false;
  public editIngredientFlag: boolean = false;
  public viewIngredientList: boolean = false;

  public addRecipeFlag: boolean = false;
  public editRecipeFlag: boolean = false;
  public viewRecipeList: boolean = false;

  public ingredient: Ingredient;
  public index: number;
  public typeIngred: string;

  constructor(
    private managService: ProductManagementService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService) {}

  ngOnInit() {
    this.managService.addIngredient.subscribe((value: boolean) => {
      this.addIngredientFlag = value;
    });

    this.managService.viewIngredient.subscribe((value: boolean) => {
      this.viewIngredientList = value;
    });

    this.managService.editIngredient.subscribe((value: boolean) => {
      this.editIngredientFlag = value;
    });

    this.managService.viewRecipeEmitter.subscribe((value: boolean)=>{
      this.viewRecipeList = value;
    });

    this.managService.addRecipeEmitter.subscribe((value: boolean)=>{
      this.addRecipeFlag = value;
    });
    
    this.ingredientService.editIngred.subscribe((data:any) => {
        this.ingredient = data.ingred as Ingredient;
        this.index = data.index as number;
        const type = this.ingredient.unitType;
        if(type === undefined) {
          this.typeIngred = "Pieces";
        } else if(type === 0) {
          this.typeIngred = "Gram";
        } else if(type === 1) {
          this.typeIngred = "Liter";
        }
        console.log(this.ingredient+" si "+this.index);
      }     
    );//alt+shift+f-> align in page

  }

  onAddIngredientSelected() {
    this.managService.onAddIngredinet(true);   
  }

  onViewIngredientList() {   
    this.managService.onViewIngredient(true);
  }

  onAddRecipe() {
    this.managService.onAddRecipe(true);
  }

  onViewRecipeList(){
    this.managService.onViewRecipe(true);
  }
}
