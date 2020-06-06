import { IngredQuantity } from "./recipe";
import { RecipeIngredient } from "./RecipeByNameDetails";

export interface ProductDetails{
    name: string;
    price: number;
    imageUrl: string;
    boughtDate: Date;
    amount: number;
    foodType: number;
    recipeName: string;
    tva?: number;
    predictedAmount?: number;
    ingredientList: RecipeIngredient[];
    id?: number;
}