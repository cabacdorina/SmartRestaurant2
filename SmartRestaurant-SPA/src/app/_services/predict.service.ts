import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
baseUrl = environment.apiUrl;
predictionUrl: string = this.baseUrl + "prediction/GetPredictionList";

public dessertList: Product[];
public mainFoodList: Product[];
public soupList: Product[];
@Output() public predictFlagEmitter: EventEmitter<boolean> = new EventEmitter();

constructor(private http: HttpClient) { }

getPrediction(prodList: Product[]): Observable<number[]> {
  return this.http.post<number[]>(this.predictionUrl, prodList);
}

concatenateLists(list1: Product[], list2:Product[], list3: Product[]){
  return [...list1, ...list2, ...list3];
}

setProductLists(dessertList: Product[], mainFoodList:Product[], soupList: Product[]){
  this.dessertList=dessertList;
  this.mainFoodList=mainFoodList;
  this.soupList=soupList;
}

}
