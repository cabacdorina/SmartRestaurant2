import { Component, OnInit } from '@angular/core';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';
import { AlertifyService } from 'src/app/_services/utils/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-main-food',
  templateUrl: './main-food.component.html',
  styleUrls: ['./main-food.component.css']
})
export class MainFoodComponent implements OnInit {

  constructor(private HttpProductService: HttpProductService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router) { }

  prods: Product[];
  prodArray = [];
  ngOnInit() {
    this.router.navigate(['/mainFood']);
    this.route.data.subscribe(data => {
      this.prods = data['theMainFood'];
    });
  }

  onItemSelected(prod: Product) {
    this.prodArray.push(prod);
    this.productService.addProducts(prod);
    this.alertify.success('Added successfully');

  }

}
