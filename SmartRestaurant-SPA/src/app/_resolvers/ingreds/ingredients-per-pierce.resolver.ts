import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Ingredient } from "../../_models/ingredient";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { AlertifyService } from "../../_services/utils/alertify.service";
import { catchError } from "rxjs/operators";
import { IngredientService } from "../../_services/ingredient.service";

@Injectable()
export class IngredPerPieceResolver implements Resolve<Ingredient> {

    constructor( private router: Router, private ingredService: IngredientService, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Ingredient> {
       return this.ingredService.getIngredientsPerPiece().pipe(
        catchError(error => {
            this.alertify.error('Problem retrieving your data');
            this.router.navigate(['/home']);
            return of(null);
        })
       );
    }

}