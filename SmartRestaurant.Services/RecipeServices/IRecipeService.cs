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
        Task<bool> DeleteById(int recipeId);
        Task<bool> Update(RecipeDto recipe, int recipeId);
        Task<RecipeDto> GetById(int recipeId);
        Task<RecipeViewDto> GetByName(string name);
        Task<IEnumerable<RecipeDto>> GetAllRecipes();
    }
}
