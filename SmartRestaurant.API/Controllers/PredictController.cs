using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpPost("GetPrediction")]
        public async Task<IActionResult> GetPrediction([FromBody] ProductDto productDto)
        {
            var amount = await _predictService.PredictAmount(productDto);
            return Ok(new  
            {
                ProductName = productDto.Name,
                Score = amount
            }) ;
        }

        [HttpPost("GetPredictionList")]
        public async Task<IActionResult> GetPredictionList([FromBody] List<ProductDto> productList)
        {
            var amountList = await _predictService.PredictAmountForProductList(productList);
            return Ok(amountList);
        }
    }
}