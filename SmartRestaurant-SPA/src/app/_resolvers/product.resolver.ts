import { Product } from "../_models/product";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AlertifyService } from "../_services/utils/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpProductService } from "../_services/HttpProduct.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductResolver implements Resolve<Product[]>{
    
    constructor(
        private prodService:HttpProductService,
        private alertifyService: AlertifyService,
        private router: Router
        ) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]>  {
        return this.prodService.getAllProducts().pipe(
            catchError(error=>{
                this.alertifyService.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}