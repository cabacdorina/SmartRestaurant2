import {
  Component,
  OnInit,
  Query,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { Product } from "src/app/_models/product";
import { ActivatedRoute } from "@angular/router";
// import { MatTableModule } from '@angular/material/table';
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";

@Component({
  selector: "app-predict-all",
  templateUrl: "./predict-all.component.html",
  styleUrls: ["./predict-all.component.css"],
})
export class PredictAllComponent implements OnInit {
  public dessertList: Product[];
  public mainFoodList: Product[];
  public soupList: Product[];
  
  public dessertDataTable: any;
  public mainFoodDataTable: any;
  public soupDataTable: any;

  constructor(
    private route: ActivatedRoute,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.dessertList = data["theDesserts"];
      this.mainFoodList = data["theMainFood"];
      this.soupList = data["theSoup"];
      console.log("list: " + this.dessertList);
    });

    this.changeRef.detectChanges();

    const dessertTable: any = $("#dessert-table").on("order.dt", function () {});
    this.dessertDataTable = dessertTable.DataTable({
      lengthMenu: [
        [3, 10, 20, -1],
        [3, 10, 20, "All"],
      ],
    });

    const mainFoodTable: any = $("#main-food-table").on("order.dt", function () {});
    this.mainFoodDataTable = mainFoodTable.DataTable({
      lengthMenu: [
        [3, 10, 20, -1],
        [3, 10, 20, "All"],
      ],
    });

    const soupDataTable: any = $("#soup-table").on("order.dt", function () {});
    this.soupDataTable = soupDataTable.DataTable({
      lengthMenu: [
        [3, 10, 20, -1],
        [3, 10, 20, "All"],
      ],
    });

  }
}
