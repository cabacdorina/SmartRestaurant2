import { Component, OnInit } from "@angular/core";
import { Product } from "../_models/product";
import { ActivatedRoute } from "@angular/router";
import { PredictService } from "../_services/predict.service";
import { AlertifyService } from "../_services/utils/alertify.service";
import { NgxSpinnerService } from "ngx-spinner";
import { RouterExtenderService } from "../_services/router-extender.service";

@Component({
  selector: "app-product-prediction",
  templateUrl: "./product-prediction.component.html",
  styleUrls: ["./product-prediction.component.css"],
})
export class ProductPredictionComponent implements OnInit {
  public predictAllFlag = false;

  public dessertFlag: boolean = false;
  public mainFoodFlag: boolean = false;
  public soupFlag: boolean = false;

  public dessertList: Product[];
  public mainFoodList: Product[];
  public soupList: Product[];

  constructor(
    private predService: PredictService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private spinnerService: NgxSpinnerService,
    private routerExtService : RouterExtenderService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.dessertList = data["theDesserts"];
      this.mainFoodList = data["theMainFood"];
      this.soupList = data["theSoup"];
    });
  }

  resetAllFlags() {
    this.dessertFlag = false;
    this.mainFoodFlag = false;
    this.soupFlag = false;
  }

  showDessertTable() {
    if(this.predictAllFlag===false){
      this.alertify.warning("Press Predict All Button to be able to see prediction");
    }else{
      this.resetAllFlags();
      this.dessertFlag = true;
    }
  }

  showMainFoodTable() {
    if(this.predictAllFlag===false){
      this.alertify.warning("Press Predict All Button to be able to see prediction");
    }else{
      this.resetAllFlags();
      this.mainFoodFlag = true;
    }
  }

  showSoupTable() {
    if(this.predictAllFlag===false){
      this.alertify.warning("Press Predict All Button to be able to see prediction");
    }else{
      this.resetAllFlags();
      this.soupFlag = true;
    }
  }

  PredictAll() {
    this.spinnerService.show();
    const productList = this.predService.concatenateLists(
      this.dessertList,
      this.mainFoodList,
      this.soupList
    );

    this.predService.getPrediction(productList).subscribe((res: number[]) => {
      this.dessertList.forEach((prod, i) => {
        this.dessertList[i].predictedAmount = res[i];
      });

      this.mainFoodList.forEach((prod, i) => {
        this.mainFoodList[i].predictedAmount = res[i + this.dessertList.length];
      });

      this.soupList.forEach((prod, i) => {
        this.soupList[i].predictedAmount =
          res[i + this.dessertList.length + this.mainFoodList.length];
      });
      
      this.predictAllFlag = true;
      this.predService.setProductLists(this.dessertList,this.mainFoodList, this.soupList);

      setTimeout(()=>{
        this.spinnerService.hide();
      }, 2000);
    });

  }

  GoShoppingAgent() {

    const productList = this.predService.concatenateLists(
      this.dessertList,
      this.mainFoodList,
      this.soupList
    );
    this.routerExtService.navigate('shoppingAgent', productList).then(()=>{
      this.predService.predictFlagEmitter.emit(this.predictAllFlag);
    });
  }
}
