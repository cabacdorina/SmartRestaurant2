using SmartRestaurant.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.RecipeServices.RecipeDTO
{
    public class RecipeDto
    {
        public string Name { get; set; }
        public List<IngredientRecipeDto> Ingredients { get; set; }
    }
}
