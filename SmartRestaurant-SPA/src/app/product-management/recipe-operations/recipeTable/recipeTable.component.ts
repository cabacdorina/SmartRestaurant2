import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from "src/app/_models/recipe";
import { ProductManagementService } from "src/app/_services/product-management.service";
import { RecipeService } from "src/app/_services/recipe.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";

@Component({
  selector: "app-recipeTable",
  templateUrl: "./recipeTable.component.html",
  styleUrls: ["./recipeTable.component.css"],
})
export class RecipeTableComponent implements OnInit {
  public selectedRecipe: Recipe;
  @Input() public recipeList: Recipe[];
  @Input() public allowOperations : boolean = true;
  @Output() public addedRecipeEmitter = new EventEmitter();

  constructor(
    private managService: ProductManagementService,
    private recipeService: RecipeService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  onRecipeSelected(i: number) {
    this.managService.onViewRecipe(true);
    this.selectedRecipe = this.recipeList[i];
    this.recipeService.onRecipeSelected(this.selectedRecipe, i);
  }

  onRemoveSelected(name: string, i: number) {
    this.recipeService.onRemoveSelected(name).subscribe((res: any) => {
      this.alertifyService.success("Recipe Deleted!");
      this.recipeList.splice(i, 1);
      console.log(res.message);
    });
  }

  onEditSelected(recipe: Recipe){
    this.managService.onEditRecipe(true);
    this.recipeService.onEditRecipe(recipe);
  }

  onRecipeAdded(recipe:Recipe){
    this.addedRecipeEmitter.emit(recipe);
  }
}
