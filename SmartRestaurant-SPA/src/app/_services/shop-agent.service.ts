import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngredShop } from '../_models/ingredShop';
import { environment } from 'src/environments/environment';
import { ProdShop } from '../_models/prodShop';

@Injectable({
  providedIn: 'root'
})
export class ShopAgentService {
  baseUrl = environment.apiUrl;

  constructor( private http: HttpClient) { }

  getIngredListToBuy(prodList: ProdShop[]):Observable<IngredShop[]>{
    return this.http.post<IngredShop[]>(this.baseUrl+"shopping/GetIngredListToBuy",prodList);
  }
}
