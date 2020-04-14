using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<RecipeIngredientPerUnit> RecipeIngredientPerUnit { get; set; }
        public virtual ICollection<RecipeIngredientPerPiece> RecipeIngredientPerPiece { get; set; }
    }
}
