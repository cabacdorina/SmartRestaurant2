using SmartRestaurant.Services.IngredientServices.IngredientDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.IngredientServices
{
    public interface IIngredientPerPieceService
    {
        Task<IngredientPerPieceDto> Create(IngredientPerPieceDto ingredient);
        Task<bool> DeleteById(int ingredientId);
        Task<bool> Update(IngredientPerPieceDto ingredient, int ingredientId);
        Task<IngredientPerPieceDto> GetById(int ingredientId);
        Task<IEnumerable<IngredientPerPieceDto>> GetAllIngredients();
    }
}
