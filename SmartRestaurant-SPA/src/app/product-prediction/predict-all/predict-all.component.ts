import {
  Component,
  OnInit,
  Query,
  ElementRef,
  ChangeDetectorRef,
  Output,
  Input,
} from "@angular/core";
import { Product } from "src/app/_models/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-predict-all",
  templateUrl: "./predict-all.component.html",
  styleUrls: ["./predict-all.component.css"],
})
export class PredictAllComponent implements OnInit {
  public dessertList: Product[];
  public mainFoodList: Product[];
  public soupList: Product[];

  @Input() public dessertFl: boolean;
  @Input() public mainFoodFl: boolean;
  @Input() public soupFl: boolean;

  constructor(
    // private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   this.dessertList = data["theDesserts"];
    //   this.mainFoodList = data["theMainFood"];
    //   this.soupList = data["theSoup"];
    //   console.log("list: " + this.dessertList);
    // });
    
  }

  concatenateProdLists() {
      
  }
}
