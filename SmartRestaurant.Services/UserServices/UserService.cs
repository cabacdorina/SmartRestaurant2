using Microsoft.IdentityModel.Tokens;
using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.UserServices.UserServiceDTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IRepository<User> userRepo, IUnitOfWork unitOfWork)
        {
            _userRepo = userRepo;
            _unitOfWork = unitOfWork;
        }

        public async Task<User> Create(UserDto userDto)
        {
            var user = new User().InjectFrom(userDto) as User;
            await _userRepo.Add(user);
            await _unitOfWork.Commit();
            return user;
        }

        public async Task<bool> DeleteById(int userId)
        {
            var user = await _userRepo.GetById(userId);
            if (user == null)
            {
                return false;
            }
            _userRepo.Delete(user);
            await _unitOfWork.Commit();
            return true;
        }

        public async Task<UserDto> GetById(int userId)
        {
            var user = await _userRepo.GetById(userId);
            if (user == null)
            {
                return null;
            }
            return new UserDto().InjectFrom(user) as UserDto;
        }

        public async Task<bool> Update(UserDto userDto, int userId)
        {
            var user = await _userRepo.GetById(userId);
            if (user == null)
            {
                return false;
            }

            user.InjectFrom(userDto);
            await _unitOfWork.Commit();
            return true;
        }

        public async Task<string> Authenticate(string username, string password)
        {
            var user = (await _userRepo.GetAll()).FirstOrDefault(x => x.Username == username && x.Password == password);
            if (null == user)
                return null;


            // authentication successful so generate jwt token
            var userType = (UserType)user.Type;
            var key = Encoding.ASCII.GetBytes("This is my secret");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[] {
                        new Claim(CustomClaimsTypes.Id, user.Id.ToString()),
                        new Claim(ClaimTypes.Role, userType.ToString())
                    }
                ),
                Issuer = "http://localhost:44365",
                Audience = "http://localhost:44365",
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenAsString = tokenHandler.WriteToken(token);

            return tokenAsString;
        }
    }
}
