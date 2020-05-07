import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-prediction',
  templateUrl: './product-prediction.component.html',
  styleUrls: ['./product-prediction.component.css']
})
export class ProductPredictionComponent implements OnInit {
  public predictAllFlag = true;
  public predictOneFlag = false;

  public dessertFlag: boolean =true;
  public mainFoodFlag: boolean =false;
  public soupFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  resetAllFlags() {
    this.dessertFlag = false;
    this.mainFoodFlag = false;
    this.soupFlag = false;
  }

  showDessertTable() {
    this.resetAllFlags();
    this.dessertFlag=true; 
  }

  showMainFoodTable(){
    this.resetAllFlags();
    this.mainFoodFlag=true;
  }

  showSoupTable(){
    this.resetAllFlags();
    this.soupFlag=true;
  }
  LoadAllPredictions(){
    
  }

}
