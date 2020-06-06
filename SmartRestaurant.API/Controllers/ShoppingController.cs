using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Services.ShoppingServiceDTO.ShoppingServices;
using SmartRestaurant.Services.ShoppingServices;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/shopping")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        private readonly IShoppingService _shoppingService;
        public ShoppingController(IShoppingService shoppingService)
        {
            _shoppingService = shoppingService;
        }

        [HttpPost("GetIngredListToBuy")]
        public async Task<IActionResult> GetIngredListToBuy([FromBody] List<ProductShopDto> prodList)
        {
            return Ok(await _shoppingService.GetIngredListToBuy(prodList));
        }
    }
}