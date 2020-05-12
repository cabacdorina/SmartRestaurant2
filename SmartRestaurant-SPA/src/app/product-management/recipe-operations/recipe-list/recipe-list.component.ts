import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/_services/recipe.service';
import { IngredientService } from 'src/app/_services/ingredient.service';
import { AlertifyService } from 'src/app/_services/utils/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipeList: Recipe[];
  
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.recipeList=data["theRecipes"];
      this.recipeService.recipeList = this.recipeList;
      //console.log("recipelist: ", this.recipeList);
    });
  }

}
