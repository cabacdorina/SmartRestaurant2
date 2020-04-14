using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.IngredientServices.IngredientDTO
{
    public class IngredientPerUnitDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public int UnitType { get; set; }
    }
}
