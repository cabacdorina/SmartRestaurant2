using Microsoft.EntityFrameworkCore;
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
        public readonly IRepository<RecipeIngredientPerPiece> _recipeIngredientPerPieceRepo;
        public readonly IRepository<RecipeIngredientPerUnit> _recipeIngredientPerUnitRepo;
        public readonly IUnitOfWork _unitOfWork;

        public RecipeService(IRepository<Recipe> recipeRepo, IUnitOfWork unitOfWork,
            IRepository<RecipeIngredientPerPiece> recipeIngredientPerPieceRepo, IRepository<RecipeIngredientPerUnit> recipeIngredientPerUnitRepo)
        {
            _recipeRepo = recipeRepo;
            _unitOfWork = unitOfWork;
            _recipeIngredientPerPieceRepo = recipeIngredientPerPieceRepo;
            _recipeIngredientPerUnitRepo = recipeIngredientPerUnitRepo;
        }
        public async Task<int> Create(RecipeDto recipeDto)
        {
            var recipe = new Recipe
            {
                Name = recipeDto.Name
            };
            await _recipeRepo.Add(recipe);
            await _unitOfWork.Commit();

            var recipeIngredientsPerPiece = recipeDto.Ingredients.Where(x => x.NumberOfPieces != null)
               .Select(x => new RecipeIngredientPerPiece
               {
                   NumberOfPieces = (int)x.NumberOfPieces,
                   IngredientPerPieceId = x.Ingred.Id,
                   RecipeId = recipe.Id
               }).ToList();

            foreach (var item in recipeIngredientsPerPiece)
            {
                await _recipeIngredientPerPieceRepo.Add(item);
            }

            var recipeIngredientsPerUnit = recipeDto.Ingredients
                .Where(x => x.Quantity != null)
               .Select(x => new RecipeIngredientPerUnit
               {
                   Quantity = (int)x.Quantity,
                   IngredientPerUnitId = x.Ingred.Id,
                   RecipeId = recipe.Id
               }).ToList();

            foreach (var item in recipeIngredientsPerUnit)
            {
                await _recipeIngredientPerUnitRepo.Add(item);
            }

            await _unitOfWork.Commit();
            return recipe.Id;
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
            var recipeList = await _recipeRepo.GetAll();
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

        public Task<RecipeViewDto> GetByName(string name)
        {
            var recipe = _recipeRepo.Query()
                            .Include(x => x.RecipeIngredientPerUnit)
                            .ThenInclude(x => x.IngredientPerUnit)
                            .Include(x => x.RecipeIngredientPerPiece)
                            .ThenInclude(x => x.IngredientPerPiece)
                            .Where(x => x.Name.Equals(name))
                            .FirstOrDefault();


            var recipeIngredPerUnit = recipe.RecipeIngredientPerUnit
                                        .Select(x => new RecipeIngredientViewDto
                                        {
                                            Name = x.IngredientPerUnit.Name,
                                            Quantity = x.IngredientPerUnit.Quantity,
                                            Type = x.IngredientPerUnit.UnitType
                                        });

            var recipeIngredPerPiece = recipe.RecipeIngredientPerPiece
                                        .Select(x => new RecipeIngredientViewDto
                                        { 
                                            Name=x.IngredientPerPiece.Name,
                                            Pieces= x.IngredientPerPiece.NumberOfPieces
                                          });
            //var recipeIngredPerPiece = recipe.RecipeIngredientPerPiece
            //                            .Select(x => x.IngredientPerPiece);

            var recipeData = new RecipeViewDto
            {
                Name = recipe.Name,
                IngredList = new List<RecipeIngredientViewDto>()
                        .Concat(recipeIngredPerUnit)
                        .Concat(recipeIngredPerPiece)
                        .ToList()
            };

            return Task.FromResult(recipeData);
        }

        public async Task<bool> Update(RecipeDto recipeDto, int recipeId)
        {
            var recipe = await _recipeRepo.GetById(recipeId);
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
