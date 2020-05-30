import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { ProductDetails } from '../_models/product-details';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {
  @Output() public productViewEmitter = new EventEmitter();
  @Output() public productEditEmitter = new EventEmitter();

  baseUrl = environment.apiUrl ;
  curDate: Date;
  readonly dessert = 0;
  readonly mainFood = 1;
  readonly soup = 2;
  readonly productUrl=this.baseUrl + 'product/food-type/';
  
  public prodList: Product[];

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

  updateProduct(prod:Product, oldName: string): Observable<Object>{
    return this.http.put(this.baseUrl+'product/UpdateProduct/'+oldName, prod);
  }
  //------------------------

  getProducts(foodUrl: string){
    return this.http.get<Product[]>(foodUrl);
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl + 'product/GetAllProducts');
  }

  getProductDetails(name: string){
    return this.http.get<ProductDetails>(this.baseUrl+'product/GetByName/'+ name);
  }

  AddSales(prods: Product[]) {
    return this.http.post(this.baseUrl + 'product/AddSales', prods);
  }

  AddProduct(prod: Product) {
    return this.http.post(this.baseUrl + 'product/AddProduct', prod);
  }

  onRemoveProduct(prodName: string){
    return this.http.delete(this.baseUrl +'product/DeteleProdByName/'+ prodName);
  }

  onViewProductDetails(prod: Product){
    this.productViewEmitter.emit({product: prod});
  }

  onEditProd(prod: Product){
    this.productEditEmitter.emit({product:prod});
  }
 
}
