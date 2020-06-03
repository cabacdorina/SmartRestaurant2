using SmartRestaurant.Services.ShoppingServiceDTO.ShoppingServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace SmartRestaurant.Services.ShoppingServices
{
    public interface IShoppingService
    {
        List<IngredShopDto> MakeShopping(List<ProductShopDto> prodList);
    }
}
