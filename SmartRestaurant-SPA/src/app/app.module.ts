import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/utils/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/utils/error.interceptor';
import { AlertifyService } from './_services/utils/alertify.service';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { DessertComponent } from './products/food-categories/dessert/dessert.component';
import { ShoppingAgentComponent } from './shopping-agent/shopping-agent.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HttpProductService } from './_services/HttpProduct.service';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { DessertResolver } from './_resolvers/dessert.resolver';
import { ProductService } from './_services/product.service';
import { MainFoodComponent } from './products/food-categories/main-food/main-food.component';
import { SoupsComponent } from './products/food-categories/soups/soups.component';
import { MainFoodResolver } from './_resolvers/mainFood.resolver';
import { SoupResolver } from './_resolvers/soup.resolver';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductRemoveComponent } from './products/product-remove/product-remove.component';
import { RegisterService } from './_services/register.service';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductManagementService } from './_services/product-management.service';
import { IngredientService } from './_services/ingredient.service';
import { IngredPerPieceResolver } from './_resolvers/ingreds/ingredients-per-pierce.resolver';
import { IngredPerUnitResolver } from './_resolvers/ingreds/ingredients-per-unit.resolver';
import { ProductPredictionComponent } from './product-prediction/product-prediction.component';
import { PredictAllComponent } from './product-prediction/predict-all/predict-all.component';
import { PredictDessertsComponent } from './product-prediction/predict-all/predict-desserts/predict-desserts.component';
import { PredictMainFoodComponent } from './product-prediction/predict-all/predict-main-food/predict-main-food.component';
import { PredictSoupComponent } from './product-prediction/predict-all/predict-soup/predict-soup.component';
import { PredictService } from './_services/predict.service';
import { AddIngredientComponent } from './product-management/ingred-operations/add-ingredient/add-ingredient.component';
import { ListIngredientsComponent } from './product-management/ingred-operations/list-ingredients/list-ingredients.component';
import { EditIngredientComponent } from './product-management/ingred-operations/edit-ingredient/edit-ingredient.component';
import { AddRecipeComponent } from './product-management/recipe-operations/add-recipe/add-recipe.component';
import { IngredTableComponent } from './product-management/recipe-operations/ingredTable/ingredTable.component';
import { RecipeService } from './_services/recipe.service';
import { RecipeListComponent } from './product-management/recipe-operations/recipe-list/recipe-list.component';
import { RecipeResolver } from './_resolvers/recipe.resolver';
import { RecipeTableComponent } from './product-management/recipe-operations/recipeTable/recipeTable.component';
import { ViewRecipeComponent } from './product-management/recipe-operations/recipe-list/view-recipe/view-recipe.component';
import { NgxSpinnerModule } from "ngx-spinner";

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      DessertComponent,
      ShoppingAgentComponent,
      ShoppingListComponent,
      ProductCardComponent,
      MainFoodComponent,
      SoupsComponent,
      ProductAddComponent,
      ProductRemoveComponent,
      ProductManagementComponent,
      AddIngredientComponent,
      ListIngredientsComponent,
      EditIngredientComponent,
      ProductPredictionComponent,
      PredictAllComponent,
      PredictDessertsComponent,
      PredictMainFoodComponent,
      PredictSoupComponent,
      AddRecipeComponent,
      IngredTableComponent,
      RecipeListComponent,
      RecipeTableComponent,
      ViewRecipeComponent 
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:44365'],
            blacklistedRoutes: ['localhost:44365/api/auth']
         }
      }),
      NgxSpinnerModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      HttpProductService,
      DessertResolver,
      MainFoodResolver,
      SoupResolver,
      IngredPerPieceResolver,
      IngredPerUnitResolver,
      ProductService,
      RegisterService,
      ProductManagementService,
      IngredientService,
      PredictService,
      RecipeService,
      RecipeResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
