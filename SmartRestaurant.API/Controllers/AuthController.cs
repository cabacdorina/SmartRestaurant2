using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Services.UserServices;
using SmartRestaurant.Services.UserServices.UserServiceDTO;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            return Ok(await _userService.Create(userDto));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userForLoginDto)
        {
            var userToken = await _userService.Authenticate(userForLoginDto.Username, userForLoginDto.Password);
            return Ok(new
            {
                token = userToken
            });
        }

        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser([FromBody]UserDto userDto, int id)
        {
            var isUpdated = await _userService.Update(userDto, id);
            if (isUpdated)
            {
                return Ok(userDto);
            }
            return NotFound();
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var IsDeleted = await _userService.DeleteById(id);
            if (IsDeleted)
            {
                return Ok($"User with id {id} was deleted.");
            }
            return NotFound();
        }
    }
}