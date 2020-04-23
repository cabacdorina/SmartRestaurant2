using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Services.IngredientServices;
using SmartRestaurant.Services.IngredientServices.IngredientDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/ingredientPerPiece")]
    [ApiController]
    public class IngredientPerPieceController: ControllerBase
    {
        private readonly IIngredientPerPieceService _ingredService;
        public IngredientPerPieceController(IIngredientPerPieceService ingredService)
        {
            _ingredService = ingredService;
        }

        [HttpGet("GetAllIngred")]
        public async Task<IActionResult>GetAllIngredients()
        {
            var ingredList= await _ingredService.GetAllIngredients();
            return Ok(ingredList);
        }

        [HttpGet("{IngredId}")]
        public async Task<IActionResult> GetIngredById(int ingredId)
        {
            var ingred = await _ingredService.GetById(ingredId);
            if (ingred == null)
            {
                return NotFound();
            }

            return Ok(ingred);
        }

        [HttpPost("AddIngred")]
        public async Task<IActionResult> AddIngred([FromBody] IngredientPerPieceDto ingredDto)
        {
            return Ok(await _ingredService.Create(ingredDto));
        }

        [HttpPut("UpdateIngredient/{id}")]
        public async Task<IActionResult> UpdateIngred([FromBody] IngredientPerPieceDto ingredDto, int id)
        {
            var IsUpdated=await _ingredService.Update(ingredDto, id);
            if (IsUpdated)
            {
                return Ok(ingredDto);
            }

            return NotFound();
        }

        [HttpDelete("DeleteIngred/{id}")]
        public async Task<IActionResult> DeleteIngred(int id)
        {
            var IsDeleted = await _ingredService.DeleteById(id);
            if (IsDeleted)
            {
                return Ok($"Product with id: {id} was deleted");
            }

            return NotFound();
        }
    }
}
