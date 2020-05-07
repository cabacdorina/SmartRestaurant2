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
import { AddIngredientComponent } from './products/operations/add-ingredient/add-ingredient.component';
import { ProductManagementService } from './_services/product-management.service';
import { ListIngredientsComponent } from './products/operations/list-ingredients/list-ingredients.component';
import { IngredientService } from './_services/ingredient.service';
import { EditIngredientComponent } from './products/operations/edit-ingredient/edit-ingredient.component';
import { IngredPerPieceResolver } from './_resolvers/ingreds/ingredients-per-pierce.resolver';
import { IngredPerUnitResolver } from './_resolvers/ingreds/ingredients-per-unit.resolver';
import { ProductPredictionComponent } from './product-prediction/product-prediction.component';
import { PredictAllComponent } from './product-prediction/predict-all/predict-all.component';
import { PredictDessertsComponent } from './product-prediction/predict-all/predict-desserts/predict-desserts.component';
import { PredictMainFoodComponent } from './product-prediction/predict-all/predict-main-food/predict-main-food.component';
import { PredictSoupComponent } from './product-prediction/predict-all/predict-soup/predict-soup.component';
import { PredictServiceService } from './_services/predict-service.service';

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
      PredictSoupComponent
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
      })
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
      PredictServiceService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
