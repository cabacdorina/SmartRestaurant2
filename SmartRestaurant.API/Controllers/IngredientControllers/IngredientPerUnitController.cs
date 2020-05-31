using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Services.IngredientServices.IngredientDTO;
using SmartRestaurant.Services.IngredientServices.IngredientInterfaces;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/ingredientPerUnit")]
    [ApiController]
    public class IngredientPerUnitController : ControllerBase
    {
        private readonly IIngredientPerUnitService _ingredService;

        public IngredientPerUnitController(IIngredientPerUnitService ingredService)
        {
            _ingredService = ingredService;
        }

        [HttpGet("GetAllIngred")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllIngred()
        {
            return Ok(await _ingredService.GetAllIngredients());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetIngredById(int id)
        {
            var ingred = await _ingredService.GetById(id);
            if (ingred == null)
            {
                return NotFound();
            }
            return Ok(ingred);
        }

        [HttpPost("AddIngred")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddIngred([FromBody]IngredientPerUnitDto ingredDto)
        {
            return Ok(await _ingredService.Create(ingredDto));
        }

        [HttpPut("UpdateIngred/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateIngred([FromBody]IngredientPerUnitDto ingredDto, int id)
        {
            var IsUpdated = await _ingredService.Update(ingredDto, id);
            if (IsUpdated)
            {
                return Ok(ingredDto);
            }
            return NotFound();
        }

        [HttpDelete("DeleteIngred/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteIngred(int id)
        {

            var IsDeleted = await _ingredService.DeleteById(id);
            if (IsDeleted)
            {
                return Ok(new { Message = $"Ingred with id: {id} was deleted." });
            }
            return NotFound();
        }

    }
}