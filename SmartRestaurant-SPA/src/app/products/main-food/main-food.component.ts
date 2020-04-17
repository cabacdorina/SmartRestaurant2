import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/utils/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { DessertService } from 'src/app/_services/dessert.service';

@Component({
  selector: 'app-main-food',
  templateUrl: './main-food.component.html',
  styleUrls: ['./main-food.component.css']
})
export class MainFoodComponent implements OnInit {

  constructor(private productService: ProductService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private dessertService: DessertService, private router: Router) { }

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
    console.log(prod.name);
    console.log(this.prodArray);
    this.dessertService.addProducts(prod);
    this.alertify.success('Added successfully');

  }

}
