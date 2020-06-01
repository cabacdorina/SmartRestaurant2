using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.CommandServices.CommandDTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.CommandService.CommandDTO
{
    public class CommandDto
    {
        public string Name { get; set; }
        public ICollection<ProductCommandDto> ProdList { get; set; }
    }
}
