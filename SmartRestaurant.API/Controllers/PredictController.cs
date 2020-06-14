using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Services.PredictServices;
using SmartRestaurant.Services.ProductServices.ProductServiceDTO;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/prediction")]
    [ApiController]
    public class PredictController : ControllerBase
    {
        private readonly IPredictService _predictService;
        public PredictController(IPredictService predictService)
        {
            _predictService = predictService;
        }


        [HttpPost("GetPredictionList")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPredictionList([FromBody] List<ProductDto> productList)
        {
            var amountList = await _predictService.PredictAmountForProductList(productList);
            return Ok(amountList);
        }
    }
}