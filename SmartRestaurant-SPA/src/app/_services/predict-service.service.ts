import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class PredictServiceService {


baseUrl = environment.apiUrl;
predictionUrl: string = this.baseUrl + "prediction/GetPredictionList";
constructor(private http: HttpClient) { }

getPrediction(prodList: Product[]): Observable<number[]> {
  return this.http.post<number[]>(this.predictionUrl, prodList);
}

}
