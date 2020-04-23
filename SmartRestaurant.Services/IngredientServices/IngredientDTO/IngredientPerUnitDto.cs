using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.IngredientServices.IngredientDTO
{
    public class IngredientPerUnitDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int UnitType { get; set; }
        public float Quantity { get; set; }
        public float QuantityReserved { get; set; }
    }
}
