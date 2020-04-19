using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class IngredientPerUnit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int UnitType { get; set; }
        public float Quantity { get; set; }
        public float QuantityReserved { get; set; }
        public virtual ICollection<RecipeIngredientPerUnit> RecipeIngredientPerUnit { get; set; }
    }
}
