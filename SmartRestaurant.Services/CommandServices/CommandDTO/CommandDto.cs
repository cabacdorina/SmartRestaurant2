using SmartRestaurant.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.CommandService.CommandDTO
{
    public class CommandDto
    {
        public string Name { get; set; }//readonly? il lasa doar sa-l initializeze?numele va fi dat automat de numele utilizatorului de logare
        public DateTime CommandDate { get; set; }
        public ICollection<ProductCommand> ProductCommand { get; set; }//ok?
    }
}
