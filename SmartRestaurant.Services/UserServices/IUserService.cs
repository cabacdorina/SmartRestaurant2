using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.UserServices.UserServiceDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.UserServices
{
    public interface IUserService
    {
        Task<User> Create(UserDto user);
        Task<bool> DeleteById(int userId);
        Task<bool> Update(UserDto user, int userId);
        Task<UserDto> GetById(int userId);
        Task<string> Authenticate(string username, string password);
    }
}
