import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/_models/product';
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import { PredictService } from 'src/app/_services/predict.service';

@Component({
  selector: 'app-predict-main-food',
  templateUrl: './predict-main-food.component.html',
  styleUrls: ['./predict-main-food.component.css']
})
export class PredictMainFoodComponent implements OnInit {
  @Input() public mainFoodLis: Product[];
  public mainFoodDataTable: any;
  
  constructor(private changeRef: ChangeDetectorRef,
    private predictService: PredictService
    ) { }

  ngOnInit() {
    this.mainFoodLis=this.predictService.mainFoodList;
    this.changeRef.detectChanges();
    const mainFoodTable: any = $("#main-food-table").on("order.dt", function () {});
    this.mainFoodDataTable = mainFoodTable.DataTable({
      lengthMenu: [
        [3, 10, 20, -1],
        [3, 10, 20, "All"],
      ],
    });

  }

}
