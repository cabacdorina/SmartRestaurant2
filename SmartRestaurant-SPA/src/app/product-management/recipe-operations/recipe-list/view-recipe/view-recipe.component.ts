import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';
import { ProductManagementService } from 'src/app/_services/product-management.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  @Input() public recipe: Recipe;
  @Input() public recipeIndex: number;

  constructor(private managService: ProductManagementService ) { }

  ngOnInit() {
    console.log(this.recipe, this.recipeIndex);
  }

  onClose(){
    this.managService.onViewRecipe(false);
    this.managService.onViewListRecipe(true);
  }
}
