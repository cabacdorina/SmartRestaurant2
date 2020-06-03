using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.ShoppingServiceDTO.ShoppingServices
{
    public class IngredShopDto
    {
        public string IngredName {get; set;}
        public int? NumberOfPieces { get; set; }
        public float? Quantity { get; set; }
        public int? UnitType { get; set; }
    }
}
