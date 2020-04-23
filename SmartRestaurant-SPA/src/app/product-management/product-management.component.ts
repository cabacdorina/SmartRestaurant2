import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.css"],
})
export class ProductManagementComponent implements OnInit {
  addIngredientFlag: boolean = false;
  viewIngredientList: boolean = false;

  constructor() {}

  ngOnInit() {}

  onAddIngredientSelected() {
    this.resetAllFlags();
    this.addIngredientFlag = true;
  }

  onViewIngredientList() {
    this.resetAllFlags();
    this.viewIngredientList = true;
  }

  private resetAllFlags() {
    this.addIngredientFlag = false;
    this.viewIngredientList = false;
  }
}
