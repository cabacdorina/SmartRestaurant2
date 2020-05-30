import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/_services/recipe.service';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';
import { AlertifyService } from 'src/app/_services/utils/alertify.service';
import { ProductManagementService } from 'src/app/_services/product-management.service';
import { Recipe } from 'src/app/_models/recipe';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent implements OnInit {
  @Input() public prod: Product;
  private oldName: string;

  public prodTypes: string[] = ["Dessert", "MainFood", "Soup"];
  public saveModalFlag: boolean = false;

  public recipeList: Recipe[];
  constructor(
    private recipeService: RecipeService,
    private prodService: HttpProductService,
    private alertify: AlertifyService,
    private prodMangService: ProductManagementService
  ) { }

  ngOnInit() {
    this.recipeService.getRecipeList().subscribe((data: Recipe[]) =>{
      this.recipeList = [...data];
    }) 

    this.oldName=this.prod.name;
  }
  onItemChange(selectedProd: string) {
    if (selectedProd === "Dessert") {
      this.prod.foodType = 0;
    } else if (selectedProd === "MainFood") {
      this.prod.foodType = 1;
    } else if (selectedProd === "Soup") {
      this.prod.foodType = 2;
    }
  }

  saveProduct(product: Product) {
    this.prodService.updateProduct(this.prod,this.oldName).subscribe(res=>{
      this.alertify.success("Product Updated!");
      this.editListItem(product);
      this.prodMangService.onViewProductList(true);
    });
  }

  editListItem(product: Product){
    const prodIndex=this.prodService.prodList.findIndex(x=>x.name===product.name);
    this.prodService.prodList.splice(prodIndex,1);
    this.prodService.prodList.push(product);
  }

  onClose() {
    this.prodMangService.onAddProduct(false);
  }

  onSearchRecipe(){
    jQuery("#exampleModal").modal({ show: true });
  }

  onRecipeReceived(recipe: Recipe) {
    this.prod.recipeName = recipe.name;
    this.hideModal();
  }
  
   hideModal(){
    jQuery("#exampleModal").modal("hide");
  }

  getFoodType(prodType:number):string{
    
    if(prodType===0){
      return "Dessert";
    }else if(prodType===1){
      return "MainFood";
    }else if(prodType===2){
      return "Soup";
    }
  }


}
