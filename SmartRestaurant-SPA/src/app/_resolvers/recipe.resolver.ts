import { Recipe } from "../_models/recipe";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { RecipeService } from "../_services/recipe.service";
import { catchError } from "rxjs/operators";
import { AlertifyService } from "../_services/utils/alertify.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeResolver implements Resolve<Recipe>{
    
    constructor(
        private recipeService:RecipeService,
        private alertifyService: AlertifyService,
        private router: Router
        ) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Recipe>  {
        return this.recipeService.getRecipeList().pipe(
            catchError(error=>{
                this.alertifyService.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }

}