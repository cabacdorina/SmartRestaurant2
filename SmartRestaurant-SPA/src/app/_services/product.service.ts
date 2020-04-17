import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl ;
  curDate: Date;
  constructor(private http: HttpClient) { }

  getDessert(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products/food-type/dessert' );
  }

  getMainFood(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products/food-type/mainFood' );
  }

  getSoup(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products/food-type/soup' );
  }

  AddSales(prods: Product[]) {
    return this.http.post(this.baseUrl + 'products/AddSales', prods);
  }

  AddProduct(prod: Product) {
    return this.http.post(this.baseUrl + 'AddProduct', prod);
  }
}
