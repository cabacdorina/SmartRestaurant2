export interface RecipeByNameDetails {
  name: string;
  ingredList: RecipeIngredient[];
}

export class RecipeIngredient {
  name: string;
  quantity?: number;
  type?: number;
  pieces?: number;
}
