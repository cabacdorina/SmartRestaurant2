import { Component, OnInit } from "@angular/core";
import { Ingredient } from "src/app/_models/ingredient";
import { IngredientService } from "src/app/_services/ingredient.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-list-ingredients",
  templateUrl: "./list-ingredients.component.html",
  styleUrls: ["./list-ingredients.component.css"],
})
export class ListIngredientsComponent implements OnInit {
  public ingredientsPerPiece: Ingredient[] = [];
  public ingredientsPerUnit: Ingredient[] = [];

  constructor(
    private ingredientService: IngredientService,
    private alertify: AlertifyService
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
  }

  onDeletePerPiece(i: number) {
    this.ingredientService
      .removeIngredientPerPiece(this.ingredientsPerPiece[i])
      .subscribe((res: any) => {
        console.log(res.message);
        this.ingredientsPerPiece.splice(i, 1);
        this.alertify.success("Ingredient removed!");
      });
  }

  onDeletePerUnit(i: number) {
    const ingredToDelete = this.ingredientsPerUnit[i];

    this.ingredientService
      .removeIngredientPerUnit(ingredToDelete)
      .subscribe((res: any) => {
        console.log(res.message);
        this.ingredientsPerUnit.splice(i, 1);
        this.alertify.success("Ingredient removed!");
      });
  }

  onEditPerPiece(ingred: Ingredient, i: number) {}
  
  onEditPerUnit(ingred: Ingredient, i: number) {}

}
