import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductManagementService } from 'src/app/_services/product-management.service';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';

@Component({
  selector: 'app-productTable',
  templateUrl: './productTable.component.html',
  styleUrls: ['./productTable.component.css']
})
export class ProductTableComponent implements OnInit {
  @Input() public productList: Product[];
  public productDataTable:any;
  public selectedProd: Product;

  constructor(
    private changeRef: ChangeDetectorRef,
    private managService: ProductManagementService,
    private prodService: HttpProductService
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
    this.managService.onViewProductDetails(true);
    this.selectedProd = this.productList[i];
    this.prodService.onViewProductDetails(this.selectedProd);
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
