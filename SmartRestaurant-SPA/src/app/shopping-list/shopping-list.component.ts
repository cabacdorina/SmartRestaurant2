import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Product } from '../_models/product';
import { DessertService } from '../_services/dessert.service';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  prods: Product[];
  curDate: Date;
  i: number;
  areChanges: boolean;
  sum: number;

  constructor(private dessertService: DessertService , private router: Router,
    private prodService: ProductService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.prods = this.dessertService.getDesserts();
    this.curDate = new Date();

    if (this.prods.length > 0) {
      this.areChanges = true;
    }

    this.calculateSumToPay();
  }

  calculateSumToPay() {
    this.sum = 0;

    for ( this.i = 0 ; this.i < this.prods.length; this.i++) {
      this.prods[this.i].boughtDate = this.curDate;
      this.sum = this.sum + this.prods[this.i].price * this.prods[this.i].amount;
    }

    this.sum = this.numberRoundedToTwoDecimals(this.sum);
  }

  numberRoundedToTwoDecimals(numberToRound: number) {
    return parseFloat(Number.parseFloat(numberToRound.toString()).toFixed(2));
  }

  TransmitDataToAPI() {

      this.prodService.AddSales(this.prods).subscribe(() => {
        this.alertify.success('Transmitted successfully');
      }, error => {
        this.alertify.error(error);
      });

      this.dessertService.resetProdArray();

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.areChanges = false;
      this.router.navigate(['/desserts']);
    }

    removeItem(item: Product) {
      this.prods = this.prods.filter( it => it !== item);
      this.sum = this.numberRoundedToTwoDecimals(this.sum - item.price * item.amount);
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };

      this.dessertService.removeProducts(item);
      if (this.prods.length === 0) {
        this.areChanges = false;
      }

    }

    onUpdateAmount(event: Event, i: number) {
      const inputAmount = (event.target as HTMLInputElement).value;
      this.prods[i].amount = parseInt(inputAmount, 10);
      this.calculateSumToPay();
      console.log(this.calculateSumToPay());
      /*console.log(this.prods[i].amount);
      console.log(i);*/
    }

}
