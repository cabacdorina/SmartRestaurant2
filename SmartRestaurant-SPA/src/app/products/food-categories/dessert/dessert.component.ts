import { Component, OnInit } from '@angular/core';
import { HttpProductService } from '../../../_services/HttpProduct.service';
import { Product } from '../../../_models/product';
import { AlertifyService } from '../../../_services/utils/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent implements OnInit {

  constructor(private HttpProductService: HttpProductService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router) { }
  prods: Product[];
  prodArray = [];

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.prods = data['theDesserts'];
    });
  }

  onItemSelected(prod: Product) {
    this.prodArray.push(prod);
    this.productService.addProducts(prod);
    this.alertify.success('Added successfully');

  }

  removeItem() {
    this.router.navigate(['/product/remove']);
  }

  addItem() {
    this.router.navigate(['/product/add']);
  }

}
