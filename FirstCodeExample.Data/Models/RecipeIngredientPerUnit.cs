using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class RecipeIngredientPerUnit
    {
        public Recipe Recipe { get; set; }
        public IngredientPerUnit IngredientPerUnit { get; set; }
        public int RecipeId { get; set; }
        public int IngredientPerUnitId { get; set; }
    }
}
