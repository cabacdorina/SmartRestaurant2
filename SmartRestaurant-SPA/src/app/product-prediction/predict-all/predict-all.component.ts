import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute } from '@angular/router';
// import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-predict-all',
  templateUrl: './predict-all.component.html',
  styleUrls: ['./predict-all.component.css']
})
export class PredictAllComponent implements OnInit {
  public dessertList: Product[];
  public mainFoodList: Product[];
  public soupList: Product[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.dessertList = data['theDesserts'];
      this.mainFoodList= data['theMainFood'];
      this.soupList=data['theSoup'];
      console.log("list: "+this.dessertList);
    });
  }

}
