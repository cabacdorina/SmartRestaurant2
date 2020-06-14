import { Component, OnInit, Input } from "@angular/core";
import { Ingredient } from "src/app/_models/ingredient";
import { IngredientService } from "src/app/_services/ingredient.service";
import { ProductManagementService } from "src/app/_services/product-management.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";

@Component({
  selector: "app-edit-ingredient",
  templateUrl: "./edit-ingredient.component.html",
  styleUrls: ["./edit-ingredient.component.css"],
})
export class EditIngredientComponent implements OnInit {
  @Input() public ingred: Ingredient;
  @Input() public type: string;
  @Input() public ingredIndex: number;
  constructor(
    private alertify: AlertifyService,
    private managService: ProductManagementService,
    private ingredService: IngredientService) {}

  oldIngredName: string; 
  oldUnitType: number;

  ngOnInit() {
    this.oldIngredName = this.ingred.name;
    this.oldUnitType= this.ingred.unitType;
  }

  saveEditedIngredient(){
    this.ingredService.editIngredient(this.ingred, this.type).subscribe(res=>{
      //console.log(res);
      this.alertify.success('Ingredient edited!');
      //this.managService.onEditIngred(false);
      this.managService.onViewIngredient(true);
    })
  }

 
  onClose(){
    this.managService.onEditIngred(false);
    this.managService.onViewIngredient(true);
  }

}
