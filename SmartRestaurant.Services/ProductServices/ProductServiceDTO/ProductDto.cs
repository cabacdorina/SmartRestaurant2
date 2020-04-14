using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.ProductServices.ProductServiceDTO
{
    public class ProductDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BoughtDate { get; set; }
        public int RecipeId { get; set; }//avem nevoie?
    }
}
