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
import { ProductService } from './_services/product.service';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { DessertResolver } from './_resolvers/dessert.resolver';
import { DessertService } from './_services/dessert.service';
import { MainFoodComponent } from './products/food-categories/main-food/main-food.component';
import { SoupsComponent } from './products/food-categories/soups/soups.component';
import { MainFoodResolver } from './_resolvers/mainFood.resolver';
import { SoupResolver } from './_resolvers/soup.resolver';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductRemoveComponent } from './products/product-remove/product-remove.component';
import { RegisterService } from './_services/register.service';

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
      ProductRemoveComponent
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
      ProductService,
      DessertResolver,
      MainFoodResolver,
      SoupResolver,
      DessertService,
      RegisterService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
