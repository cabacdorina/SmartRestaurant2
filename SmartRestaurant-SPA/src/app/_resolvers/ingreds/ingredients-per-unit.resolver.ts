import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Ingredient } from "../../_models/ingredient";
import { IngredientService } from "../../_services/ingredient.service";
import { AlertifyService } from "../../_services/utils/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class IngredPerUnitResolver implements Resolve<Ingredient>{

    constructor( private router: Router, private ingredService: IngredientService, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Ingredient> {
        return this.ingredService.getIngredientsPerUnit().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
           );
    }

}