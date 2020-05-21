import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public prodList: Product[];
  constructor(
    private route: ActivatedRoute,
    private prodService: HttpProductService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.prodList = data["theProds"];
      this.prodService.prodList = this.prodList;
    });
  }

}
