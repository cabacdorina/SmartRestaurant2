import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { DessertComponent } from './products/dessert/dessert.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingAgentComponent } from './shopping-agent/shopping-agent.component';
import { DessertResolver } from './_resolvers/dessert.resolver';
import { MainFoodComponent } from './products/main-food/main-food.component';
import { SoupsComponent } from './products/soups/soups.component';
import { MainFoodResolver } from './_resolvers/mainFood.resolver';
import { SoupResolver } from './_resolvers/soup.resolver';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductRemoveComponent } from './products/product-remove/product-remove.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'desserts', component: DessertComponent,
                 resolve: {theProds: DessertResolver}},
            { path: 'shoppingList', component: ShoppingListComponent },
            { path: 'shoppingAgent', component:  ShoppingAgentComponent },
            { path: 'mainFood', component: MainFoodComponent,
                    resolve: {theMainFood: MainFoodResolver} },
            { path: 'soups', component: SoupsComponent,
                     resolve: {theSoup: SoupResolver}},
            {
                path: 'product/add', component: ProductAddComponent},
                {
                    path: 'product/remove', component: ProductRemoveComponent}

        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
