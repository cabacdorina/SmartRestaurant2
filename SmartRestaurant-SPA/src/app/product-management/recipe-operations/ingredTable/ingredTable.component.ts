import { Component, OnInit, Input } from '@angular/core';
import { IngredQuantity } from 'src/app/_models/recipe';

@Component({
  selector: 'app-ingred-table',
  templateUrl: './ingredTable.component.html',
  styleUrls: ['./ingredTable.component.css']
})
export class IngredTableComponent implements OnInit {

  @Input() public ingredQuantityList: IngredQuantity[];
  constructor() { }

  ngOnInit() {
  }

}
