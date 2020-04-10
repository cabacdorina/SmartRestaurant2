using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class ProductCommand
    {
        public Command Command { get; set; }
        public Product Product { get; set; }
        public int CommandId { get; set; }
        public int ProductId { get; set; }
        
    }
}
