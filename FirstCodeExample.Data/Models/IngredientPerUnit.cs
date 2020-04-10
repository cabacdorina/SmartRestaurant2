using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class IngredientPerUnit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }
        public int UnitType { get; set; }
    }
}
