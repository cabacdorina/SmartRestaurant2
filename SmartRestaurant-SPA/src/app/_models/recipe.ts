import { Ingredient } from "./ingredient";

export interface Recipe{
    name: string;
    ingredients: IngredQuantity[];
}

export interface IngredQuantity {
    ingred: Ingredient;
    quantity? : number;
    numberOfPieces?: number;
}