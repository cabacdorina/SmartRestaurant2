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

        [Required]
        [RegularExpression(@"^[A-Z]+[a-zA-Z0-9""'\s-]*$")]
        [StringLength(20, MinimumLength = 3)]
        public string Name { get; set; }

        //[DataType(DataType.Currency)]
        //[Column(TypeName = "decimal(5, 2)")]
        public float Price { get; set; }
       
        [Required]
        //[RegularExpression(@"[01]+")]
        public int UnitType { get; set; }
        public virtual ICollection<RecipeIngredientPerUnit> RecipeIngredientPerUnit { get; set; }
    }
}
