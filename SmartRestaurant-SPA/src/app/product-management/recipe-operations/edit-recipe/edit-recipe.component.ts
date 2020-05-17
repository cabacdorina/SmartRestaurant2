import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { IngredientService } from "src/app/_services/ingredient.service";
import { IngredQuantity, Recipe } from "src/app/_models/recipe";
import { Ingredient } from "src/app/_models/ingredient";
import { RecipeService } from "src/app/_services/recipe.service";
import { ProductManagementService } from "src/app/_services/product-management.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";

@Component({
  selector: "app-edit-recipe",
  templateUrl: "./edit-recipe.component.html",
  styleUrls: ["./edit-recipe.component.css"],
})
export class EditRecipeComponent implements OnInit {
  @Input() public recipe: Recipe;
  public ingredQuantityList: IngredQuantity[] = [];

  public selectedIngredient: Ingredient;

  public ingredientsPerPiece: Ingredient[] = [];
  public ingredientsPerUnit: Ingredient[] = [];
  public ingredList: Ingredient[];

  public concatFlag: boolean = false;
  public saveModalFlag: boolean = true;
  ingredMap = new Map();
  public oldNameRecipe: string;

  constructor(
    private ingredientService: IngredientService,
    private detectChange: ChangeDetectorRef,
    private recipeService: RecipeService,
    private productManagementServ: ProductManagementService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.oldNameRecipe = "" + this.recipe.name;

    this.ingredientService
      .getIngredientsPerPiece()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredientsPerPiece = ingredients;
        console.log(this.ingredientsPerPiece);
      });

    this.ingredientService
      .getIngredientsPerUnit()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredientsPerUnit = ingredients;
        console.log(this.ingredientsPerUnit);
      });

    this.selectedIngredient = {
      name: "",
      price: -1,
    };

    if (this.recipe.ingredients !== null)
      this.ingredQuantityList = [...this.recipe.ingredients];
    this.detectChange.detectChanges();
  }

  createMap() {
    let name: string, ingred: Ingredient;
    for (let i = 0; i < this.ingredList.length; ++i) {
      name = this.ingredList[i].name;
      ingred = this.ingredList[i];
      this.ingredMap.set(name, ingred);
    }
  }

  onItemChange(selectedIngred: string) {
    if (selectedIngred !== "Choose Item") {
      this.selectedIngredient = this.ingredMap.get(selectedIngred);
      console.log("AICI ", this.selectedIngredient);
      this.saveModalFlag = false;
    } else {
      this.saveModalFlag = true;
      this.selectedIngredient = {
        name: "",
        price: -1,
      };
    }
  }

  saveEditedRecipe() {
    this.recipeService
      .editRecipe(
        {
          ingredients: this.ingredQuantityList,
          name: this.recipe.name,
        } as Recipe,
        this.oldNameRecipe
      )
      .subscribe((res) => {
        this.alertifyService.success("Recipe edited!");
        const recipeIndex = this.recipeService.recipeList.findIndex(x=>x.name === this.recipe.name);
        this.recipeService.recipeList.splice(recipeIndex, 1);
        this.recipeService.recipeList.push({
          ingredients: this.ingredQuantityList,
          name: this.recipe.name,
        } as Recipe);
        //this.ingredQuantityList = res.
        console.log(res);
        this.productManagementServ.onEditRecipe(false);
      });
  }

  onClose() {
    this.productManagementServ.onAddRecipe(false);
  }

  addNewIngred() {
    if (!this.concatFlag) {
      this.ingredList = [
        ...this.ingredientsPerUnit,
        ...this.ingredientsPerPiece,
      ];
      this.createMap();
    }
    jQuery("#exampleModal").modal({ show: true } as Bootstrap.ModalOption);
  }

  onSaveItem() {
    //console.log(this.selectedIngredient.name);
    if (this.ingredQuantityList === undefined) {
      this.ingredQuantityList = [];
    }
    if (this.selectedIngredient.name !== "") {
      if (this.selectedIngredient.unitType === undefined) {
        this.ingredQuantityList.push({
          ingred: this.selectedIngredient,
          numberOfPieces: this.selectedIngredient.numberOfPieces,
        } as IngredQuantity);
      } else {
        this.ingredQuantityList.push({
          ingred: this.selectedIngredient,
          quantity: this.selectedIngredient.quantity,
        } as IngredQuantity);
      }

      console.log(this.selectedIngredient);
      if (this.selectedIngredient.name !== "") {
        jQuery("#exampleModal").modal("hide");
      }
    }
  }
}
