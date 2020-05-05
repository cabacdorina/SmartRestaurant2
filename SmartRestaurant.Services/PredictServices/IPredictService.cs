using SmartRestaurant.Services.ProductServices.ProductServiceDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmartRestaurant.Services.PredictServices
{
    public interface IPredictService
    {
        Task<int> PredictAmount(ProductDto productDto);
        Task<List<int>> PredictAmountForProductList(List<ProductDto> prodList);
    }
}
