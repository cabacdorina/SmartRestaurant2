using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.ShoppingServiceDTO.ShoppingServices
{
    public class IngredShopDto
    {
        public string IngredName {get; set;}
        public int? NumberOfPieces { get; set; }
        public int? NumberOfPiecesToBuy { get; set; }
        public float? Quantity { get; set; }
        public float? QuantityToBuy { get; set; }
        public int? UnitType { get; set; }
    }
}
