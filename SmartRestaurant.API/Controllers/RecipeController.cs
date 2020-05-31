using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Omu.ValueInjecter;
using SmartRestaurant.Services.RecipeServices;
using SmartRestaurant.Services.RecipeServices.RecipeDTO;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public readonly IRecipeService _recService;
        public RecipeController(IRecipeService recService)
        {
            _recService = recService;
        }

        [HttpGet("GetAllRecipes")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllRecipes()
        {
            return Ok(await _recService.GetAllRecipes());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var recipe= await _recService.GetById(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        [HttpPost("AddRecipe")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRecipe([FromBody] RecipeDto recipeDto)
        {
            return Ok(new { Recipe = await _recService.Create(recipeDto)});
        }

        [HttpPut("UpdateRecipeByName/{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRecipeByName([FromBody]RecipeDto recipeDto, string name)
        {
           var IsUpdated=await _recService.UpdateByName(recipeDto,name);
           if (IsUpdated)
           {
               return Ok(recipeDto);
           }
           return NotFound();
        }

        [HttpPut("UpdateRecipe/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRecipe([FromBody]RecipeDto recipeDto, int id)
        {
            var IsUpdated = await _recService.Update(recipeDto, id);
            if (IsUpdated)
            {
                return Ok(recipeDto);
            }
            return NotFound();
        }
        [HttpDelete("DeleteRecipe/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var IsDeleted=await _recService.DeleteById(id);
            if (IsDeleted)
            {
                return Ok($"Recipe with id {id} was deleted.");
            }
            return NotFound();
        }

        [HttpGet("GetRecipeByName/{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRecipeByName(string name)
        {
            var recipe = await _recService.GetByName(name);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }


        [HttpDelete("DeleteRecipeByName/{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRecipeByName(string name)
        {
            var IsDeleted = await _recService.DeleteRecipeByName(name);
            if (IsDeleted)
            {
                return Ok(new { Message = $"Recipe with name {name} was deleted." });
            }
            return NotFound();
        }

    }
}