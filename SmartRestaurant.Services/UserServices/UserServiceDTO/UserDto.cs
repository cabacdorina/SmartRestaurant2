using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.UserServices.UserServiceDTO
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int? Type { get; set; }
    }
}
