import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';
import { ProductDetails } from 'src/app/_models/product-details';
import { ProductManagementService } from 'src/app/_services/product-management.service';

@Component({
  selector: 'app-view-prod',
  templateUrl: './view-prod.component.html',
  styleUrls: ['./view-prod.component.css']
})
export class ViewProdComponent implements OnInit {
  @Input() public prod: Product;
  prodDetails: ProductDetails;

  constructor(
    private prodService: HttpProductService,
    private managService: ProductManagementService
  ) { }

  ngOnInit() {
    this.prodService.getProductDetails(this.prod.name).subscribe((data: ProductDetails)=>{
      this.prodDetails = data;
    });
  }

  onClear(){
    this.managService.onViewProductDetails(false);
    this.managService.onViewProductList(true);
  }
}
