import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { IngredQuantity, Recipe } from "src/app/_models/recipe";
import { Ingredient } from "src/app/_models/ingredient";
import { IngredientService } from "src/app/_services/ingredient.service";
import { RecipeService } from "src/app/_services/recipe.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.component.html",
  styleUrls: ["./add-recipe.component.css"],
})
export class AddRecipeComponent implements OnInit {
  public recipe: any;
  public ingredQuantityList: IngredQuantity[];

  public selectedIngredient: Ingredient;

  public ingredientsPerPiece: Ingredient[] = [];
  public ingredientsPerUnit: Ingredient[] = [];
  public ingredList: Ingredient[];

  public concatFlag: boolean = false;
  public saveModalFlag: boolean = true;
  ingredMap = new Map();

  constructor(
    private ingredientService: IngredientService,
    private detectChange: ChangeDetectorRef,
    private recipeService: RecipeService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
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

    this.recipe = {
      name: "",
    };

    this.selectedIngredient = {
      name: "",
      price: -1,
    };

    this.ingredQuantityList = [];
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
      console.log("AICI ",this.selectedIngredient);
      this.saveModalFlag = false;
    } else {
      this.saveModalFlag = true;
      this.selectedIngredient = {
        name: "",
        price: -1,
      };
    }
  }

  saveRecipe() {
    this.recipeService.addRecipe({
      ingredients: this.ingredQuantityList,
      name: this.recipe.name,
    } as Recipe).subscribe((res)=> {
      //console.log(res);
      this.alertifyService.success("Recipe added!");
      this.recipeService.addRecipeEmitter.emit(false);
    })
  }

  onClose() {
    this.recipeService.onAddRecipe(false);
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
    console.log(this.selectedIngredient.name);
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
