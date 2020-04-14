﻿using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.RecipeServices.RecipeDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.RecipeServices
{
    public interface IRecipeService
    {
        Task<Recipe> Create(RecipeDto recipe);
        Task<bool> DeleteById(int recipeId);
        Task<bool> Update(RecipeDto recipe, int recipeId);
        Task<RecipeDto> GetById(int recipeId);
        Task<IEnumerable<RecipeDto>> GetAllRecipes();
    }
}
