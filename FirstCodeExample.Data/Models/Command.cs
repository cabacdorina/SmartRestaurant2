using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class Command
    {
        public int Id { get; set; }
        public virtual ICollection<ProductCommand> ProductCommand { get; set; }
    }
}
