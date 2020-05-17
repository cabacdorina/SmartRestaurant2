using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.RecipeServices.RecipeDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.RecipeServices
{
    public interface IRecipeService
    {
        Task<int> Create(RecipeDto recipe);
        Task<bool> Update(RecipeDto recipe, int recipeId);
        Task<bool> UpdateByName(RecipeDto recipe, string name);
        Task<RecipeDto> GetById(int recipeId);
        Task<RecipeViewDto> GetByName(string name);
        Task<List<RecipeDto>> GetAllRecipes();

        Task<bool> DeleteById(int recipeId);
        Task<bool> DeleteRecipeByName(string name);
    }
}
