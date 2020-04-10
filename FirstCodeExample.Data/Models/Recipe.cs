using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<IngredientPerUnit> IngredientPerUnits { get; set; }
        public virtual ICollection<IngredientPerPiece> IngredientPerPieces { get; set; }
        public Product Product {get; set;}
    }
}
