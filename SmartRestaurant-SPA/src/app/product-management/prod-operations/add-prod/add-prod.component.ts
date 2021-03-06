import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/_models/product";
import { RecipeService } from "src/app/_services/recipe.service";
import { Recipe } from "src/app/_models/recipe";
import { HttpProductService } from "src/app/_services/HttpProduct.service";
import { AlertifyService } from "src/app/_services/utils/alertify.service";
import { ProductManagementService } from "src/app/_services/product-management.service";

@Component({
  selector: "app-add-prod",
  templateUrl: "./add-prod.component.html",
  styleUrls: ["./add-prod.component.css"],
})
export class AddProdComponent implements OnInit {
  public prod: Product;
  public prodTypes: string[] = ["Dessert", "MainFood", "Soup"];
  public saveModalFlag: boolean = false;

  public recipeList: Recipe[];
  constructor(
    private recipeService: RecipeService,
    private prodService: HttpProductService,
    private alertify: AlertifyService,
    private prodMangService: ProductManagementService
    ) {}

  ngOnInit() {
    this.prod = {
      name: "",
      foodType: -1,
      recipeName: ""
    } as Product;

    this.recipeService.getRecipeList().subscribe((data: Recipe[]) =>{
      this.recipeList = [...data];
    }) 
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
    this.prodService.AddProduct(this.prod).subscribe(res=>{
      this.alertify.success("Product added!");
      this.prodService.prodList.push(product);
      this.prodMangService.onViewProductList(true);
    });
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
}

