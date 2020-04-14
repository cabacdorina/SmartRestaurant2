using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.IngredientServices.IngredientDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.IngredientServices
{
    public class IngredientPerPieceService : IIngredientPerPieceService
    {
        private readonly IRepository<IngredientPerPiece> _ingredRepo;
        private readonly IUnitOfWork _unitOfWork;

        public IngredientPerPieceService(IRepository<IngredientPerPiece> ingredientRepo,
           IUnitOfWork unitOfWork)
        {
            _ingredRepo = ingredientRepo;
            _unitOfWork = unitOfWork;
        }
        public async Task<IngredientPerPieceDto> Create(IngredientPerPieceDto ingredient)
        {
            var newIngred = new IngredientPerPiece().InjectFrom(ingredient) as IngredientPerPiece;
            await _ingredRepo.Add(newIngred);
            await _unitOfWork.Commit();

            return ingredient;
        }

        public async Task<bool> DeleteById(int ingredientId)
        {
            var ingred = await _ingredRepo.GetById(ingredientId);
            if (ingred == null)
            {
                return false;
            }

            _ingredRepo.Delete(ingred);
            await _unitOfWork.Commit();

            return true;
        }

        public async Task<IEnumerable<IngredientPerPieceDto>> GetAllIngredients()
        {
            var ingredList = await _ingredRepo.GetAll();
            return ingredList.Select(p => new IngredientPerPieceDto().InjectFrom(p) as IngredientPerPieceDto);
        }

        public async Task<IngredientPerPieceDto> GetById(int ingredientId)
        {
            var ingred = await _ingredRepo.GetById(ingredientId);
            if (ingred == null)
            {
                return null;
            }

            return new IngredientPerPieceDto().InjectFrom(ingred) as IngredientPerPieceDto;
        }

        public async Task<bool> Update(IngredientPerPieceDto ingredient, int ingredientId)
        {
            var ingred = await _ingredRepo.GetById(ingredientId);
            if (ingred == null)
            {
                return false;
            }

            ingred.InjectFrom(ingredient);
            await _unitOfWork.Commit();
            return true;
        }
    }
}
