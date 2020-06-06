using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
using SmartRestaurant.Services.RecipeServices.RecipeDTO;
using System;
using System.Collections;
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
                await _unitOfWork.Commit();
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
                await _unitOfWork.Commit();
            }

            return recipe.Id;
        }

        public async Task<List<RecipeDto>> GetAllRecipes()
        {
            List<RecipeDto> newRecipeList = new List<RecipeDto>();

            var recipeList = await _recipeRepo.Query()
                .Include(x => x.RecipeIngredientPerUnit)
                .ThenInclude(x => x.IngredientPerUnit)
                .Include(x => x.RecipeIngredientPerPiece)
                .ThenInclude(x => x.IngredientPerPiece).ToListAsync();

            foreach (var recipe in recipeList)
            {
                var recipeDto = new RecipeDto
                {
                    Name = recipe.Name
                };

                var ingredientsPerUnit = recipe.RecipeIngredientPerUnit
                                         .Select(x => new IngredientRecipeDto()
                                         {
                                             Ingred = new IngredientRecipe
                                             {
                                                 Id = x.IngredientPerUnit.Id,
                                                  Name = x.IngredientPerUnit.Name,
                                                  UnitType=x.IngredientPerUnit.UnitType,
                                                  Quantity=x.IngredientPerUnit.Quantity,
                                                  Price=x.IngredientPerUnit.Price
                                             },
                                             Quantity = x.Quantity
                                         });

                var ingredinetsPerPieces = recipe.RecipeIngredientPerPiece
                             .Select(x => new IngredientRecipeDto()
                             {
                                 Ingred = new IngredientRecipe
                                 {
                                     Id = x.IngredientPerPiece.Id,
                                     Name = x.IngredientPerPiece.Name,
                                     NumberOfPieces = x.IngredientPerPiece.NumberOfPieces,
                                     Price = x.IngredientPerPiece.Price
                                 },
                                 NumberOfPieces = x.NumberOfPieces
                             });

                recipeDto.Ingredients = new List<IngredientRecipeDto>()
                                            .Concat(ingredientsPerUnit)
                                            .Concat(ingredinetsPerPieces).ToList();

                newRecipeList.Add(recipeDto);                            
            }

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


            var recipeIngredPerUnit = recipe.RecipeIngredientPerUnit//select for filte some columns or fields
                                        .Select(x => new RecipeIngredientViewDto
                                        {
                                            Name = x.IngredientPerUnit.Name,
                                            Quantity = x.Quantity,
                                            Type = x.IngredientPerUnit.UnitType
                                        });

            var recipeIngredPerPiece = recipe.RecipeIngredientPerPiece
                                        .Select(x => new RecipeIngredientViewDto
                                        {
                                            Name = x.IngredientPerPiece.Name,
                                            Pieces = x.NumberOfPieces
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

        public async Task<bool> DeleteRecipeByName(string name)
        {
            var recipe = _recipeRepo.Query().Where(x => x.Name.Equals(name)).FirstOrDefault();
            if (recipe == null)
            {
                return false;
            }
            _recipeRepo.Delete(recipe);
            await _unitOfWork.Commit();
            return true;
        }

        public async Task<bool> UpdateByName(RecipeDto recipe, string name)
        {
            bool isDeleted=await DeleteRecipeByName(name);
            //by default Query e sincron
            if (!isDeleted)
            {
                return false;
            }
            await Create(recipe);
            
            await _unitOfWork.Commit();
            return true;
        }
    }
}
