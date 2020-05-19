import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {

  baseUrl = environment.apiUrl ;
  curDate: Date;
  readonly dessert = 0;
  readonly mainFood = 1;
  readonly soup = 2;
  readonly productUrl=this.baseUrl + 'product/food-type/';

  constructor(private http: HttpClient) { }

  getDessert(): Observable<Product[]> {
    return this.getProducts(this.productUrl+this.dessert);
  }

  getMainFood(type: string): Observable<Product[]> {
    return this.getProducts(this.productUrl+this.mainFood);
  }

  getSoup(type: string): Observable<Product[]> {
    return this.getProducts(this.productUrl+this.soup);
  }

  getProducts(foodUrl: string){
    return this.http.get<Product[]>(foodUrl);
  }

  AddSales(prods: Product[]) {
    return this.http.post(this.baseUrl + 'product/AddSales', prods);
  }

  AddProduct(prod: Product) {
    return this.http.post(this.baseUrl + 'product/AddProduct', prod);
  }
}
