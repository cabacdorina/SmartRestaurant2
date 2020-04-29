using Omu.ValueInjecter;
using SmartRestaurant.Data.Infrastructure;
using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.IngredientServices.IngredientDTO;
using SmartRestaurant.Services.IngredientServices.IngredientInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.IngredientServices
{
    public class IngredientPerUnitService : IIngredientPerUnitService
    {
        private readonly IRepository<IngredientPerUnit> _ingredRepo;
        private readonly IUnitOfWork _unitOfWork;
        public IngredientPerUnitService(IRepository<IngredientPerUnit> ingred, IUnitOfWork unit)
        {
            _ingredRepo = ingred;
            _unitOfWork = unit;
        }
        public async Task<IngredientPerUnit> Create(IngredientPerUnitDto ingredient)
        {
            var ingred = new IngredientPerUnit().InjectFrom(ingredient) as IngredientPerUnit;
            await _ingredRepo.Add(ingred);
            await _unitOfWork.Commit();

            ingredient.Id = ingred.Id;
            return ingred;
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

        public async Task<IEnumerable<IngredientPerUnitDto>> GetAllIngredients()
        {
            var ingredList = await _ingredRepo.GetAll();
            return ingredList.Select(i => new IngredientPerUnitDto().InjectFrom(i) as IngredientPerUnitDto);
        }

        public async Task<IngredientPerUnitDto> GetById(int ingredientId)
        {
            var ingred = await _ingredRepo.GetById(ingredientId);
            if (ingred == null)
            {
                return null;
            }
            return new IngredientPerUnitDto().InjectFrom(ingred) as IngredientPerUnitDto;
        }

        public async Task<bool> Update(IngredientPerUnitDto ingredient, int ingredientId)
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
