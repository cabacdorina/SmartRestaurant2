import { Component, OnInit } from "@angular/core";
import { Ingredient } from "src/app/_models/ingredient";
import { IngredientService } from "src/app/_services/ingredient.service";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.css"],
})
export class AddIngredientComponent implements OnInit {
  ingred: Ingredient;
  type: string;

  constructor(private ingredinetService: IngredientService) {
    this.ingred = {
      name: "",
      price: 0,
      numberOfPieces: 0,
      numberOfPiecesReserved: 0,
      quantity: 0,
      quantityReserved: 0,
      unitType: -1,
    };
  }

  ngOnInit() {}

  saveIngredient() {
    this.ingredinetService.addIngredient(this.ingred, this.type).subscribe(res=>{
      console.log(res);
    })
  }

  onClear() {}
}
