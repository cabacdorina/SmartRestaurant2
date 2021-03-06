import { Component, OnInit } from "@angular/core";
import { ProductManagementService } from "../_services/product-management.service";
import { IngredientService } from "../_services/ingredient.service";
import { Ingredient } from "../_models/ingredient";
import { RecipeService } from "../_services/recipe.service";
import { Recipe } from "../_models/recipe";
import { Product } from "../_models/product";
import { HttpProductService } from "../_services/HttpProduct.service";

@Component({
  selector: "app-product-management",
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.css"],
})
export class ProductManagementComponent implements OnInit {
  public addIngredientFlag: boolean = false;
  public editIngredientFlag: boolean = false;
  public viewIngredientList: boolean = false;

  public addRecipeFlag: boolean = false;
  public editRecipeFlag: boolean = false;
  public viewRecipeListFlag: boolean = false; 

  public viewRecipeFlag: boolean = false;

  public addProductFlag: boolean = false;
  public viewProductListFlag: boolean = false;

  public productDetailsFlag: boolean = false;
  public productEditFlag: boolean = false; 

  public ingredient: Ingredient;
  public ingredIndex: number;
  public typeIngred: string;

  public recipe:Recipe;
  public recipeIndex: number;

  public prodDetails: Product;
  public prodEdit: Product;

  constructor(
    private managService: ProductManagementService,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private prodService: HttpProductService) {}

  ngOnInit() {
    this.managService.addIngredient.subscribe((value: boolean) => {
      this.addIngredientFlag = value;
    });

    this.managService.viewIngredient.subscribe((value: boolean) => {
      this.viewIngredientList = value;
    });

    this.managService.editIngredient.subscribe((value: boolean) => {
      this.editIngredientFlag = value;
    });

    this.managService.viewRecipeListEmitter.subscribe((value: boolean)=>{
      this.viewRecipeListFlag = value;
    }); 

    this.managService.addRecipeEmitter.subscribe((value: boolean)=>{
      this.addRecipeFlag = value;
    });
    
    this.managService.viewRecipeEmitter.subscribe((value: boolean)=>{
      this.viewRecipeFlag = value;
    });

    this.managService.editRecipeEmitter.subscribe((value:boolean)=>{
      this.editRecipeFlag=value;
    });

    this.recipeService.editRecipeEmitter.subscribe((value: Recipe)=>{
      this.recipe=value;
    });
    
    this.ingredientService.editIngred.subscribe((data:any) => {
        this.ingredient = data.ingred as Ingredient;
        this.ingredIndex = data.index as number;
        const type = this.ingredient.unitType;
        if(type === undefined) {
          this.typeIngred = "Pieces";
        } else if(type === 0) {
          this.typeIngred = "Gram";
        } else if(type === 1) {
          this.typeIngred = "Liter";
        }
        console.log(this.ingredient+" si "+this.ingredIndex);
      }     
    );//alt+shift+f-> align in page

    this.managService.addProductEmitter.subscribe((value:boolean)=>{
      this.addProductFlag = value;
    });

    this.managService.viewProductListEmitter.subscribe((value:boolean)=>{
      this.viewProductListFlag = value;
    });

    this.managService.poductDetailsEmitter.subscribe((value:boolean)=>{
      this.productDetailsFlag = value;
    });

    this.managService.editProdEmitter.subscribe((value: boolean)=>{
      this.productEditFlag = value;
    });

    this.prodService.productEditEmitter.subscribe((data: any)=>{
      this.prodEdit = data.product as Product;
      console.log("prod Edit",this.prodEdit);
    });
    
    this.recipeService.recipeEmitter.subscribe((data:any)=>{
      this.recipe = data.recipe as Recipe;
      this.recipeIndex=data.index as number;
    });

    this.prodService.productViewEmitter.subscribe((data:any)=>{
      this.prodDetails = data.product as Product;
    });

   
  }

  onAddIngredientSelected() {
    this.managService.onAddIngredinet(true);   
  }

  onViewIngredientList() {   
    this.managService.onViewIngredient(true);
  }

  onAddRecipe() {
    this.managService.onAddRecipe(true);
  }

  onViewRecipeList(){
    this.managService.onViewListRecipe(true);
  }

  onAddProduct(){
    this.managService.onAddProduct(true);
  }

  onViewProduct(){
    this.managService.onViewProductList(true);
  }
}
