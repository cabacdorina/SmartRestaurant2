import { Component, OnInit } from "@angular/core";
import { ProductManagementService } from "../_services/product-management.service";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.css"],
})
export class ProductManagementComponent implements OnInit {
  addIngredientFlag: boolean = false;
  editIngredientFlag: boolean = true;
  viewIngredientList: boolean = false;

  constructor(private managService: ProductManagementService) {}

  ngOnInit() {
    this.managService.addIngredient.subscribe((value: boolean) => {
      this.addIngredientFlag = value;
    });

    this.managService.viewIngredient.subscribe((value: boolean) => {
      this.viewIngredientList = value;
    });
  }

  onAddIngredientSelected() {
    this.managService.onAddIngredinet(true);   
  }

  onViewIngredientList() {   
    this.managService.onViewIngredient(true);
  }
}
