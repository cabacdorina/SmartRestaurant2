import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/_models/ingredient';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {
  ingred: Ingredient;
  type: string;
  constructor() { }

  ngOnInit() {
  }

}
