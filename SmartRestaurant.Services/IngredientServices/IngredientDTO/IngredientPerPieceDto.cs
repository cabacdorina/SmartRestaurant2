using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.IngredientServices.IngredientDTO
{
    public class IngredientPerPieceDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        //public int RecipeId { get; set; }
        public int NumberOfPiecesReserved { get; set; }
        public int NumberOfPieces { get; set; }
    }
}
