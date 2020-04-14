using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.ProductServices.ProductServiceDTO
{
    public class IngredientDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public int? NumberOfPiecesReserved { get; set; }
        public int? NumberOfPieces { get; set; }
        public int? UnitType { get; set; }
    }
}
