using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.RecipeServices.RecipeDTO
{
    public class RecipeIngredientViewDto
    {
        public string Name { get; set; }
        public float? Quantity { get; set; }
        public int? Type { get; set; }
        public int? Pieces { get; set; }
    }
}
