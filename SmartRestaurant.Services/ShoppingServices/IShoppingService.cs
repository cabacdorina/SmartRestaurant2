using SmartRestaurant.Services.ShoppingServiceDTO.ShoppingServices;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.ShoppingServices
{
    public interface IShoppingService
    {
        Task<List<IngredShopDto>> GetIngredListToBuy(List<ProductShopDto> prodList);
    }
}
