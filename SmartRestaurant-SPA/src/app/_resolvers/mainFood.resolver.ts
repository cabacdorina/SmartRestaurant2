import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../_models/product';
import { HttpProductService } from '../_services/HttpProduct.service';
import { AlertifyService } from '../_services/utils/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MainFoodResolver implements Resolve<Product> {
    type = 'mainFood';
    constructor(private prodService: HttpProductService, private router: Router,
        private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.prodService.getMainFood(this.type).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
