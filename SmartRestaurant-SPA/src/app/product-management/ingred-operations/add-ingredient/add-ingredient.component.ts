import { Component, OnInit } from "@angular/core";
import { Ingredient } from "src/app/_models/ingredient";
import { IngredientService } from "src/app/_services/ingredient.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";
import { ProductManagementService } from "src/app/_services/product-management.service";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.css"],
})
export class AddIngredientComponent implements OnInit {
  ingred: Ingredient;
  type: string;

  constructor(
    private alertify: AlertifyService,
    private managService: ProductManagementService,
    private ingredService: IngredientService
  ) {
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
    this.ingredService
      .addIngredient(this.ingred, this.type)
      .subscribe((res: any) => {
        this.ingred.id = res.id;
        this.alertify.success("Ingredient added!");
        this.managService.onAddIngredinet(false);
        this.populateIngredLists();
      });
  }

  populateIngredLists() {
    if (this.type === "Gram" || this.type === "Liter") {
      this.ingredService.ingredientsPerUnit.push(this.ingred);
    }

    if (this.type === "Pieces") {
      this.ingredService.ingredientsPerPiece.push(this.ingred);
    }
  }

  onClose() {
    this.managService.onAddIngredinet(false);
  }
}
