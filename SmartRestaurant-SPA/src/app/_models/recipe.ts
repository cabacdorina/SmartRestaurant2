import { Ingredient } from "./ingredient";

export interface Recipe{
    name: String;
    ingredients: IngredQuantity[];
}

export interface IngredQuantity {
    ingred: Ingredient;
    quantity? : number;
    numberOfPieces?: number;
}