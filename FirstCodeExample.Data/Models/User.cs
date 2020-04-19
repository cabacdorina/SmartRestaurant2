using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password{ get; set; }
        public int Type { get; set; }
        public string PhoneNumber { get; set; }//put regular expression
    }
}