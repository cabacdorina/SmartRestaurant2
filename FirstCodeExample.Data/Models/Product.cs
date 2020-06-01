using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public int AmountReserved { get; set; }
        public int FoodType { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BoughtDate { get; set; }
        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }
        public virtual ICollection<ProductCommand> ProductCommand { get; set; }
    }
}
