import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-productTable',
  templateUrl: './productTable.component.html',
  styleUrls: ['./productTable.component.css']
})
export class ProductTableComponent implements OnInit {
  @Input() public productList: Product[];
  public productDataTable:any;

  constructor(
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.changeRef.detectChanges();
    const productTable: any = $("#product-table").on("order.dt", function(){});
    
    this.productDataTable = productTable.DataTable({
      lengthMenu: [
        [3, 10, 20, -1],
        [3, 10, 20, "All"],
      ]
    });
  }

  onViewProductSelected(i:number){

  }

  onEditProductSelected(prod: Product){

  }

  onRemoveProductSelected(prodName: string, i: number){

  }

  getFoodType(prodType:number):string{
    
    if(prodType===0){
      return "Dessert";
    }else if(prodType===1){
      return "MainFood";
    }else if(prodType===2){
      return "Soup";
    }
  }

}
