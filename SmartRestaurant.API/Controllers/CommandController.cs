using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Services.CommandService.CommandDTO;
using SmartRestaurant.Services.CommandServices;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/command")]
    [ApiController]
    public class CommandController : ControllerBase
    {
        private readonly ICommandService _commandService;

        public CommandController(ICommandService commandService)
        {
            _commandService = commandService;
        }

        [HttpGet("GetAllCommands")]
        public async Task<IActionResult> GetAllCommands()
        {
            var commandList=await _commandService.GetAllCommands();
            return Ok(commandList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var command=await _commandService.GetById(id);
            if (command == null)
            {
                return NotFound();
            }
            return Ok(command);
        }

        [HttpPost("AddCommand")]
        public async Task<IActionResult> AddCommand([FromBody] CommandDto command)
        {
           return Ok(await _commandService.Create(command));
        }

        [HttpPut("UpdateCommand/{id}")]
        public async Task<IActionResult> UpdateCommand([FromBody] CommandDto commandDto, int id)
        {
            var isUpdated =await  _commandService.Update(commandDto, id);
            if (isUpdated)
            {
                return Ok(commandDto);
            }
            return NotFound();
        }

        [HttpDelete("DeleteCommand/{id}")]
        public async Task<IActionResult> DeleteCommand(int id)
        {
            var isDeleted=await _commandService.DeleteById(id);
            if (isDeleted)
            {
                return Ok($"Command with id {id} was deleted.");
            }
            return NotFound();
        }
    }
}