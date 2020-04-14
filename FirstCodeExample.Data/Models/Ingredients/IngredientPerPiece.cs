using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class IngredientPerPiece
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public float Price { get; set; }
        public int NumberOfPiecesReserved { get; set; }
        [Required]
        public int NumberOfPieces { get; set; }
        public virtual ICollection<RecipeIngredientPerPiece> RecipeIngredientPerPiece { get; set; }
    }
}
