import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DessertService } from 'src/app/_services/dessert.service';

@Component({
  selector: 'app-soups',
  templateUrl: './soups.component.html',
  styleUrls: ['./soups.component.css']
})
export class SoupsComponent implements OnInit {

  constructor(private productService: ProductService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private dessertService: DessertService, private router: Router) { }

  prods: Product[];
  prodArray = [];
  ngOnInit() {
    this.router.navigate(['/soups']);
    this.route.data.subscribe(data => {
      this.prods = data['theSoup'];
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
