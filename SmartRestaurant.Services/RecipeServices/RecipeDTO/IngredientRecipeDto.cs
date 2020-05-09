using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.RecipeServices.RecipeDTO
{
    public class IngredientRecipeDto
    {
        public int? Quantity { get; set; }
        public int? NumberOfPieces { get; set; }
        public IngredientRecipe Ingred { get; set; }
    }

    public class IngredientRecipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int? NumberOfPieces { get; set; }
        public int? NumberOfPiecesReserved { get; set; }
        public int? UnitType { get; set; }
        public int? Quantity { get; set; }
        public int? QuantityReserved { get; set; }
    }
}
