import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';
import { AlertifyService } from 'src/app/_services/utils/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-soups',
  templateUrl: './soups.component.html',
  styleUrls: ['./soups.component.css']
})
export class SoupsComponent implements OnInit {

  constructor(private HttpProductService: HttpProductService,
    private alertify: AlertifyService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router) { }

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
    this.productService.addProducts(prod);
    this.alertify.success('Added successfully');

  }

}
