import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/_models/product';

import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import { PredictService } from 'src/app/_services/predict.service';

@Component({
  selector: 'app-predict-desserts',
  templateUrl: './predict-desserts.component.html',
  styleUrls: ['./predict-desserts.component.css']
})
export class PredictDessertsComponent implements OnInit {
  @Input() public dessertLis:  Product[];
  public dessertDataTable: any;

  constructor(
    private changeRef: ChangeDetectorRef,
    private predictService: PredictService
    ) { 

  }

  ngOnInit() {
    this.dessertLis = this.predictService.dessertList;
    this.changeRef.detectChanges();

     const dessertTable: any = $("#dessert-table").on("order.dt", function () {});
     this.dessertDataTable = dessertTable.DataTable({
       lengthMenu: [
         [3, 10, 20, -1],
         [3, 10, 20, "All"],
       ],
     });
  }
  
  
 
}
