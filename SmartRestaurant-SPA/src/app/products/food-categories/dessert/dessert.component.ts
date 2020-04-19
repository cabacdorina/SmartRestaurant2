import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_models/product';
import { AlertifyService } from '../../../_services/utils/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DessertService } from 'src/app/_services/dessert.service';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent implements OnInit {

  constructor(private productService: ProductService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private dessertService: DessertService, private router: Router) { }
  prods: Product[];
  prodArray = [];

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.prods = data['theDesserts'];
    });
  }

  onItemSelected(prod: Product) {
    this.prodArray.push(prod);
    console.log(prod.name);
    console.log(this.prodArray);
    this.dessertService.addProducts(prod);
    this.alertify.success('Added successfully');

  }

  removeItem() {
    this.router.navigate(['/product/remove']);
  }

  addItem() {
    this.router.navigate(['/product/add']);
  }

}
