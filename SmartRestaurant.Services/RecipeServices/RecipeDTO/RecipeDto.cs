using SmartRestaurant.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.RecipeServices.RecipeDTO
{
    public class RecipeDto
    {
        public string Name { get; set; }
        public int IngredPerUnitId { get; set; }
        public int IngredPerPieceId { get; set; }
    }
}
