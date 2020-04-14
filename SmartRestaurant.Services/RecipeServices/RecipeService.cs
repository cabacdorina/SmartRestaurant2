using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.RecipeServices.RecipeDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.RecipeServices
{
    public class RecipeService : IRecipeService
    {
        public readonly IRepository<Recipe> _recipeRepo;
        public readonly IUnitOfWork _unitOfWork;

        public RecipeService(IRepository<Recipe> recipeRepo, IUnitOfWork unitOfWork)
        {
            _recipeRepo = recipeRepo;
            _unitOfWork = unitOfWork;
        }
        public async Task<Recipe> Create(RecipeDto recipeDto)
        {
            var recipe = new Recipe().InjectFrom(recipeDto) as Recipe;
            await _recipeRepo.Add(recipe);
            await _unitOfWork.Commit();
            return recipe;
        }

        public async Task<bool> DeleteById(int recipeId)
        {
            var recipe = await _recipeRepo.GetById(recipeId);
            if (recipe == null)
            {
                return false;
            }
            _recipeRepo.Delete(recipe);
            await _unitOfWork.Commit();
            return true;
        }

        public async Task<IEnumerable<RecipeDto>> GetAllRecipes()
        {
            var recipeList=await _recipeRepo.GetAll();
            var newRecipeList = recipeList.Select(r => new RecipeDto().InjectFrom(r) as RecipeDto);
            return newRecipeList;
        }

        public async Task<RecipeDto> GetById(int recipeId)
        {
            var recipe = await _recipeRepo.GetById(recipeId);
            if (recipe == null)
            {
                return null;
            }
            return new RecipeDto().InjectFrom(recipe) as RecipeDto;
        }

        public async Task<bool> Update(RecipeDto recipeDto, int recipeId)
        {
            var recipe=await _recipeRepo.GetById(recipeId);
            if (recipe == null)
            {
                return false;
            }

            recipe.InjectFrom(recipeDto);
            await _unitOfWork.Commit();
            return true;
        }
    }
}
