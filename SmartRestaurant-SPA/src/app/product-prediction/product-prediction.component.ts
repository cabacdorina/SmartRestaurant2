import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { ActivatedRoute } from '@angular/router';
import { PredictServiceService } from '../_services/predict-service.service';

@Component({
  selector: 'app-product-prediction',
  templateUrl: './product-prediction.component.html',
  styleUrls: ['./product-prediction.component.css']
})
export class ProductPredictionComponent implements OnInit {
  public predictAllFlag = false;
  public predictOneFlag = false;

  public dessertFlag: boolean =false;
  public mainFoodFlag: boolean =false;
  public soupFlag: boolean = false;

  constructor(private predService: PredictServiceService) { }

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

  PredictAll() {
    this.predService.getPrediction().subscribe(res=>{
      console.log(res);
    });
  }
}
