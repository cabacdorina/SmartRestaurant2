using SmartRestaurant.Data.Models;
using SmartRestaurant.Services.IngredientServices.IngredientDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.IngredientServices.IngredientInterfaces
{
    public interface IIngredientPerUnitService
    {
        Task<IngredientPerUnit> Create(IngredientPerUnitDto ingredient);
        Task<bool> DeleteById(int ingredientId);
        Task<bool> Update(IngredientPerUnitDto ingredient, int ingredientId);
        Task<IngredientPerUnitDto> GetById(int ingredientId);
        Task<IEnumerable<IngredientPerUnitDto>> GetAllIngredients();
    }
}
