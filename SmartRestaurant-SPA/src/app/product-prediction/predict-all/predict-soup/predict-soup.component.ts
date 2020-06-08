import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { PredictService } from 'src/app/_services/predict.service';

@Component({
  selector: 'app-predict-soup',
  templateUrl: './predict-soup.component.html',
  styleUrls: ['./predict-soup.component.css']
})
export class PredictSoupComponent implements OnInit {
  @Input() public soupLis: Product[];
  public soupDataTable: any;
  
  constructor(
    private changeRef: ChangeDetectorRef,
    private predictService: PredictService
    ) { }

  ngOnInit() {
    this.soupLis=this.predictService.soupList;
    this.changeRef.detectChanges();

    const soupDataTable: any = $("#soup-table").on("order.dt", function () {});
    this.soupDataTable = soupDataTable.DataTable({
      lengthMenu: [
        [3, 5, 7, -1],
        [3, 5, 7, "All"],
      ],
    });

  }

}
