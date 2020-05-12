import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';

@Component({
  selector: 'app-recipeTable',
  templateUrl: './recipeTable.component.html',
  styleUrls: ['./recipeTable.component.css']
})
export class RecipeTableComponent implements OnInit {
  @Input() public recipeList: Recipe[];
  
  constructor() { }

  ngOnInit() {
  }

}
