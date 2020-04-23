import { Component, OnInit } from "@angular/core";
import { Ingredient } from "src/app/_models/ingredient";
import { IngredientService } from "src/app/_services/ingredient.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-list-ingredients",
  templateUrl: "./list-ingredients.component.html",
  styleUrls: ["./list-ingredients.component.css"],
})
export class ListIngredientsComponent implements OnInit {
  public ingredientsPerPiece: Ingredient[] = [];
  public ingredientsPerUnit: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) {}

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
    this.ingredientService.removeIngredientPerPiece(this.ingredientsPerPiece[i]);
  }

  onDeletePerUnit(i: number) {
    this.ingredientService.removeIngredientPerUnit(this.ingredientsPerUnit[i]);

  }
}
