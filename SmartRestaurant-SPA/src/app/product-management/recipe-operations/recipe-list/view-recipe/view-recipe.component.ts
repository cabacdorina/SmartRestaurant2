import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from "src/app/_models/recipe";
import { ProductManagementService } from "src/app/_services/product-management.service";
import { RecipeService } from "src/app/_services/recipe.service";
import { RecipeByNameDetails } from "src/app/_models/RecipeByNameDetails";

@Component({
  selector: "app-view-recipe",
  templateUrl: "./view-recipe.component.html",
  styleUrls: ["./view-recipe.component.css"],
})
export class ViewRecipeComponent implements OnInit {
  @Input() public recipe: Recipe;
  @Input() public recipeIndex: number;
  public recipeDetails: RecipeByNameDetails;

  constructor(
    private managService: ProductManagementService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    //console.log(this.recipe, this.recipeIndex);
    this.recipeService.getRecipeByName(this.recipe.name)
      .subscribe((res: RecipeByNameDetails) => {
        this.recipeDetails = res;
        console.log(this.recipeDetails);
      });
  }

  onClose() {
    this.managService.onViewRecipe(false);
    this.managService.onViewListRecipe(true);
  }
}
