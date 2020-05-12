using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.RecipeServices.RecipeDTO
{
    public class RecipeViewDto
    {
        public string Name { get; set; }
        public List<RecipeIngredientViewDto> IngredList { get; set; }
    }
}
