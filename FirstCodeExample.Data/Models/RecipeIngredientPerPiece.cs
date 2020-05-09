using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class RecipeIngredientPerPiece
    {
        public Recipe Recipe { get; set; }
        public IngredientPerPiece IngredientPerPiece { get; set; }
        public int RecipeId { get; set; }
        public int IngredientPerPieceId { get; set; }
        public int NumberOfPieces { get; set; }
    }
}
