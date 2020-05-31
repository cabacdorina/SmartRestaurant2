using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartRestaurant.Services.BusinessModels;
using SmartRestaurant.Services.ProductServices;
using SmartRestaurant.Services.ProductServices.ProductServiceDTO;

namespace SmartRestaurant.API.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [Authorize(Roles = "Admin,Normal")]
        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var prods = await _productService.GetAllProducts();
            return Ok(prods);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Normal")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var prod = await _productService.GetById(id);
            if (prod == null)
            {
                return NotFound();
            }

            return Ok(prod);
        }

        [HttpGet("GetByName/{name}")]
        [Authorize(Roles = "Admin,Normal")]
        public async Task<IActionResult> GetProductByName(string name)
        {
            return Ok( await _productService.GetByName(name));
        }

        [HttpPost("AddProduct")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddProduct([FromBody] ProductDto prod)
        {
            return Ok(await _productService.Create(prod));
        }

        //[HttpPut("UpdateProduct/{id}")]
        //public async Task<IActionResult> UpdateProduct(int id, [FromBody]ProductDto product)
        //{
        //    var res=await _productService.Update(product, id);
        //    if (res)
        //    {
        //        return Ok(product);
        //    }

        //    return NotFound();
        //}

        [HttpPut("UpdateProduct/{oldName}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct([FromBody]ProductDto product,string oldName)
        {
            var res = await _productService.UpdateByName(product, oldName);
            if (res)
            {
                return Ok(product);
            }

            return NotFound();
        }

        [HttpDelete("DeleteProduct/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            bool deleted = await _productService.DeleteById(id);
            if (deleted)
            {
                return Ok($"Product with id: {id} was deleted");
            }

            return NotFound();
        }

        [HttpDelete("DeteleProdByName/{name}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteByName(string name)
        {
            bool deleted = await _productService.DeleteByName(name);
            if (deleted)
            {
                return Ok(new { Message = $"Product named: {name} was deleted."});
            }

            return NotFound();
        }


        [HttpGet("food-type/{type}")]
        [Authorize(Roles = "Admin,Normal")]
        public async Task<IActionResult> GetProds([FromRoute]int type)
        {
            var prods = await _productService.GetByType(type);
            return Ok(prods);
        }


        [HttpPost("AddSales")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSales([FromBody] IList<ProductDto> prods)
        {
            SaledProductsArray saledProd = new SaledProductsArray(prods);
            await saledProd.WriteSaledProdToFile(prods);

            return Ok("Sales added");
        }

        [HttpGet("GetAllProductIngredients/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllProductIngredients(int id)
        {
            var product = await _productService.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(await _productService.GetAllProductIngredients(id));
        }
    }
}