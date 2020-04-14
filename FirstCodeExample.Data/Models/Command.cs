using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class Command
    {
        public int Id { get; set; }
        public string Name { get; set; }//il lasa doar sa-l initializeze?numele va fi dat automat de numele utilizatorului de logare
        public DateTime CommandDate { get; set; }
        public virtual ICollection<ProductCommand> ProductCommand { get; set; }
    }
}
