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

  constructor() { }

  ngOnInit() {
  }

  LoadAllPredictions(){
    
  }

}
